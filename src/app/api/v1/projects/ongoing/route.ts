import { countOngoingProjects } from "@/data/portfolio";

export async function GET() {
  const result = await countOngoingProjects();
  return Response.json({ data: result }, { status: 200 });
}
