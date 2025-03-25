import { createErrorLog } from "@/data/errorLog";
import { createPortfolio, getAllPortfolio } from "@/data/portfolio";
import { validateToken } from "@/lib/jwt/validateToken";
import { PagingSchema } from "@/lib/schema/pagingSchema";
import { PortfolioSchema } from "@/lib/schema/portfolioSchema";
import getProjectFromGithub from "@/server/actions/getPojectFromGithub";
import { Prisma } from "@prisma/client";

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
    const data = await req.json();
    const validatedData = PortfolioSchema.safeParse(data);
    if (!validatedData.success)
      return Response.json(validatedData.error, { status: 400 });

    const portfolioData = validatedData.data;
    if (!portfolioData.id) portfolioData.id = undefined;
    const createdPortfolio = await createPortfolio(portfolioData);
    return Response.json({ data: createdPortfolio }, { status: 200 });
  } catch (error) {
    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { message: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
}
