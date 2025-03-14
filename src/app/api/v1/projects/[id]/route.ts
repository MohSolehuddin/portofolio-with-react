import { db } from "@/server/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const portfolio = await db.portfolio.findUnique({
    where: { id },
  });

  if (!portfolio) {
    return Response.json({ message: "Portfolio not found" }, { status: 404 });
  }

  return Response.json({ data: portfolio }, { status: 200 });
}
