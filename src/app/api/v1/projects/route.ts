import {
  getLastUpdate,
  upsertHistoryOfUpdatingPortfolio,
} from "@/data/historyOfUpdatingPortfolio";
import {
  createPortfolio,
  deletePortfolio,
  updatePortfolio,
} from "@/data/portfolio";
import { github } from "@/lib/github";
import { PagingSchema } from "@/lib/schema/pagingSchema";
import { PortfolioSchema } from "@/lib/schema/portfolioSchema";
import { db } from "@/server/db";
import {
  PortfolioGithubResponse,
  portfolioMapper,
} from "@/server/response-mapper/portfolioMapper";

export async function GET(req: Request) {
  try {
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

    const projects = await github.request("GET /user/repos", {
      type: "all",
      per_page: limit,
      page,
      sort: "created",
      direction: "desc",
    });

    const linkHeader = projects.headers.link;
    const isNext = linkHeader?.includes(`rel="next"`);
    const isPrev = linkHeader?.includes(`rel="prev"`);
    let totalPage = 1;
    if (isNext) {
      const lastPattern = /(?<=<)([\S]*)(?=>; rel="last")/i;
      const lastUrl = linkHeader?.match(lastPattern)?.[0];
      const numberOfLastPage = new URL(lastUrl ?? "").searchParams.get("page");
      totalPage = Number(numberOfLastPage ?? 1);
    }
    if (isPrev) {
      const prevPattern = /(?<=<)([\S]*)(?=>; rel="prev")/i;
      const lastUrl = linkHeader?.match(prevPattern)?.[0];
      const numberOfLastPage = new URL(lastUrl ?? "").searchParams.get("page");
      if (numberOfLastPage) {
        totalPage = Number(numberOfLastPage) + 1;
      }
    }

    const data = portfolioMapper(projects.data as PortfolioGithubResponse[]);
    const responseData = {
      message: "Successfully getting projects",
      data,
      paging: {
        page,
        limit,
        totalPage,
      },
    };

    const lastUpdate = await getLastUpdate();

    if (lastUpdate.length > 0) {
      const lastUpdateDate = new Date(lastUpdate[0].lastUpdate);
      const timeDiff = new Date().getTime() - lastUpdateDate.getTime();
      const hoursDiff = timeDiff / (1000 * 3600);
      if (hoursDiff < 24) return Response.json(responseData, { status: 200 });
    }

    (async () => {
      for (const project of data) {
        await db.portfolio.upsert({
          where: { id: project.id },
          update: {
            description: project.description ?? "",
            private: project.private,
            linkRepo: project.linkRepo,
            isShow: !project.private,
            ended: project.ended,
            updatedAt: new Date(),
          },
          create: {
            id: project.id,
            name: project.name,
            description: project.description ?? "",
            private: project.private,
            linkRepo: project.linkRepo,
            image: project.image,
            started: project.started,
            ended: project.ended,
          },
        });
      }

      await upsertHistoryOfUpdatingPortfolio();
    })();

    return Response.json(responseData, { status: 200 });
  } catch (error) {
    if (error) {
      const errorString = JSON.stringify(error);
      const createdError = await db.errorLog.create({
        data: {
          message: errorString,
        },
      });
      return Response.json(
        { message: "Something went wrong", requestId: createdError.id },
        { status: 500 }
      );
    }
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  const validatedData = PortfolioSchema.safeParse(data);
  if (!validatedData.success)
    return Response.json(validatedData.error, { status: 400 });

  const createdPortfolio = await createPortfolio(validatedData.data);
  return Response.json({ data: createdPortfolio }, { status: 200 });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ message: "id is required" }, { status: 400 });

  const deletedPortfolio = await deletePortfolio(id);
  return Response.json({ data: deletedPortfolio }, { status: 200 });
}
export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ message: "id is required" }, { status: 400 });

  const data = await req.json();

  const validatedData = PortfolioSchema.safeParse(data);
  if (!validatedData.success)
    return Response.json(validatedData.error, { status: 400 });

  const updatedPortfolio = await updatePortfolio(id, {
    ...validatedData.data,
  });

  return Response.json({ data: updatedPortfolio }, { status: 200 });
}
