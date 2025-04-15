import { createErrorLog } from "@/data/errorLog";
import {
  deletePortfolio,
  updatePortfolio,
  updatePortfolioImage,
} from "@/data/portfolio";
import { updateImageInCloudinary } from "@/lib/cloudinary/cloudinary";
import { PortfolioInputSchema } from "@/lib/schema/portfolioSchema";
import { db } from "@/server/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const portfolio = await db.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      return Response.json({ message: "Portfolio not found" }, { status: 404 });
    }

    return Response.json({ data: portfolio }, { status: 200 });
  } catch (error) {
    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { message: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id)
      return Response.json({ message: "id is required" }, { status: 400 });

    const deletedPortfolio = await deletePortfolio(id);
    return Response.json({ data: deletedPortfolio }, { status: 200 });
  } catch (error) {
    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { message: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) return Response.json({ message: "id is required" }, { status: 400 });

  const formData = await req.formData();

  const rawImage = formData.get("image");
  const data = Object.fromEntries(formData);
  delete data.id;
  delete data.image;

  const transformDataToValidateData = {
    ...data,
    isPrivate: data.isPrivate === "true",
    isShow: data.isShow === "true",
  };

  try {
    const validatedData = PortfolioInputSchema.safeParse(
      transformDataToValidateData
    );
    if (!validatedData.success)
      return Response.json(validatedData.error, { status: 400 });

    const updatedPortfolio = await updatePortfolio(id, {
      ...validatedData.data,
    });

    (async () => {
      if (rawImage && rawImage instanceof File) {
        const buffer = Buffer.from(await rawImage.arrayBuffer());
        const uploadedImage = await updateImageInCloudinary(
          updatedPortfolio.imageId ?? "",
          buffer
        );
        const imageUrl = uploadedImage.secure_url as string;
        const imageId = uploadedImage.public_id as string;
        await updatePortfolioImage(id, imageUrl, imageId);
      }
    })();

    return Response.json({ data: updatedPortfolio }, { status: 200 });
  } catch (error) {
    console.log({ error });
    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { message: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
}
