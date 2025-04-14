import { createErrorLog } from "@/data/errorLog";
import {
  createPortfolio,
  getAllPortfolio,
  updatePortfolioImage,
} from "@/data/portfolio";
import { uploadToCloudinary } from "@/lib/cloudinary/cloudinary";
import { validateToken } from "@/lib/jwt/validateToken";
import { PagingSchema } from "@/lib/schema/pagingSchema";
import {
  PortfolioInputSchema,
  PortfolioSchema,
} from "@/lib/schema/portfolioSchema";
import getProjectFromGithub from "@/server/actions/getPojectFromGithub";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const runtime = "nodejs";

interface filtersInterface {
  where: Prisma.PortfolioWhereInput;
}

const getFiltersForUserOrAdmin = async (req: Request) => {
  const isTokenValid = await validateToken(req);

  const filters: filtersInterface = {
    where: {
      deletedAt: null,
      isShow: true,
    },
  };

  if (!isTokenValid) return filters;
  return (filters.where = {});
};

export async function GET(req: Request) {
  try {
    (async () => {
      await getProjectFromGithub();
    })();
    const { searchParams } = new URL(req.url);
    let page = searchParams.get("page") || 1;
    let limit = searchParams.get("limit") || 10;

    const validatedData = PagingSchema.safeParse({
      page,
      limit,
    });

    if (!validatedData.success)
      return Response.json(validatedData.error, { status: 400 });

    page = validatedData.data.page;
    limit = validatedData.data.limit;

    const filters = await getFiltersForUserOrAdmin(req);
    console.log({ filters });
    const dataFromDatabase = await getAllPortfolio({
      page,
      limit,
      orderBy: { ended: "desc" },
      ...filters,
    });

    const responseData = {
      message: "Successfully getting projects",
      ...dataFromDatabase,
    };

    return Response.json(responseData, { status: 200 });
  } catch (error) {
    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { message: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData);
    const transformDataToValidateData = {
      ...data,
      isPrivate: data.isPrivate === "true",
      isShow: data.isShow === "true",
    };

    const validatedData = PortfolioInputSchema.safeParse(
      transformDataToValidateData
    );
    if (!validatedData.success) {
      return Response.json({ error: validatedData.error }, { status: 400 });
    }

    const dataForCreatingPortfolio: z.infer<typeof PortfolioSchema> = {
      ...validatedData.data,
      id: validatedData.data.id || undefined,
      image: "https://msytc.vercel.app/uploading.svg",
    };
    const createdPortfolio = await createPortfolio(dataForCreatingPortfolio);

    (async () => {
      let imageUrl: string | undefined;
      if (validatedData.data.image) {
        const fileBuffer = await validatedData.data.image.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);
        const uploadedImage = await uploadToCloudinary(buffer);

        imageUrl = uploadedImage.secure_url as string;
        await updatePortfolioImage(createdPortfolio.id, imageUrl);
      }
    })();

    return Response.json({ data: createdPortfolio }, { status: 200 });
  } catch (error) {
    console.log(error);
    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { error: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
}
