import { countCompletedProjects } from "@/data/portfolio";

export async function GET() {
  const result = await countCompletedProjects();
  return Response.json({ data: result }, { status: 200 });
}
