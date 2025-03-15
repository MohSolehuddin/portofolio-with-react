import { db } from "@/server/db";

export async function GET() {
  const countCompletedProjects = await db.portfolio.count({
    where: {
      completedAt: {
        not: null,
      },
    },
  });
  return Response.json({ data: countCompletedProjects }, { status: 200 });
}
