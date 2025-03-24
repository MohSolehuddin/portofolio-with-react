import {
  getLastUpdate,
  upsertHistoryOfUpdatingPortfolio,
} from "@/data/historyOfUpdatingPortfolio";
import { github } from "@/lib/github";
import { db } from "@/server/db";
import {
  PortfolioGithubResponse,
  portfolioMapper,
} from "@/server/response-mapper/portfolioMapper";

const getProjectFromGithubByPage = async (page: number, limit: number) => {
  return await github.request("GET /user/repos", {
    type: "all",
    per_page: limit,
    page,
    sort: "created",
    direction: "desc",
  });
};

const upsertProject = async (data: PortfolioGithubResponse[]) => {
  const projects = portfolioMapper(data);

  for (const project of projects) {
    await db.portfolio.upsert({
      where: { id: project.id },
      update: {
        description: project.description ?? "",
        isPrivate: project.isPrivate,
        linkRepo: project.linkRepo,
        isShow: !project.isPrivate,
        ended: project.ended,
        updatedAt: new Date(),
      },
      create: {
        id: project.id,
        name: project.name,
        description: project.description ?? "",
        isPrivate: project.isPrivate,
        linkRepo: project.linkRepo,
        image: project.image,
        started: project.started,
        ended: project.ended,
      },
    });
  }

  await upsertHistoryOfUpdatingPortfolio();
};

const getProjectFromGithub = async (page: number = 1, limit: number = 100) => {
  const lastUpdate = await getLastUpdate();

  if (lastUpdate.length > 0) {
    const lastUpdateDate = new Date(lastUpdate[0].lastUpdate);
    const timeDiff = new Date().getTime() - lastUpdateDate.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    if (hoursDiff < 24) return;
  }

  const projects = await getProjectFromGithubByPage(page, limit);

  await upsertProject(projects.data as PortfolioGithubResponse[]);

  const linkHeader = projects.headers.link;
  const isNext = linkHeader?.includes(`rel="next"`);
  const existingLast = linkHeader?.includes(`rel="last"`);
  let totalPage = 1;

  if (isNext && existingLast) {
    const lastPattern = /(?<=<)([\S]*)(?=>; rel="last")/i;
    const lastUrl = linkHeader?.match(lastPattern)?.[0];
    const numberOfLastPage = new URL(lastUrl ?? "").searchParams.get("page");
    totalPage = Number(numberOfLastPage ?? 1);

    for (let index = 2; index <= totalPage; index++) {
      const nextProjects = await getProjectFromGithubByPage(index, limit);
      await upsertProject(nextProjects.data as PortfolioGithubResponse[]);
    }
  }
};

export default getProjectFromGithub;
