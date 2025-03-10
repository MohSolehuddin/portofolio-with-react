import { github } from "@/lib/github";
import { db } from "@/server/db";
import { getToken } from "next-auth/jwt";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;

  if (Number(page).toString() === "NaN" || Number(limit).toString() === "NaN") {
    return Response.json(
      {
        message: "Invalid page or limit, please input a number",
        data: [],
      },
      { status: 400 }
    );
  }

  const projects = await github.request("GET /user/repos", {
    type: "all",
    per_page: Number(limit),
    page: Number(page),
    sort: "created",
    direction: "desc",
  });

  const lastUpdate = await db.historyOfUpdatingPortfolio.findMany({
    orderBy: {
      lastUpdate: "desc",
    },
    take: 1,
  });

  if (lastUpdate.length > 0) {
    const lastUpdateDate = new Date(lastUpdate[0].lastUpdate);

    const timeDiff = new Date().getTime() - lastUpdateDate.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);

    if (hoursDiff < 24) {
      return Response.json({ data: projects.data }, { status: 200 });
    }
  }

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log(token);

  (async () => {
    const data = projects.data.map((project) => ({
      id: project.id.toString(),
      name: project.name,
      description: project.description,
      private: project.private,
      linkRepo: project.html_url,
      image: project.owner.avatar_url,
      started: new Date(project.created_at as string),
      ended: new Date(project.updated_at as string),
    }));

    for (const project of data) {
      await db.portfolio.upsert({
        where: { id: project.id },
        update: {
          id: project.id,
          description: project.description ?? "",
          private: project.private,
          linkRepo: project.linkRepo,
          image: project.image,
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

    await db.historyOfUpdatingPortfolio.upsert({
      where: { id: "1" },
      update: {
        lastUpdate: new Date(),
      },
      create: {
        id: "1",
        lastUpdate: new Date(),
      },
    });
  })();

  return Response.json({ data: projects.data }, { status: 200 });
}
