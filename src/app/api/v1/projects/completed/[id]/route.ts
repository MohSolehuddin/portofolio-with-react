import { db } from "@/server/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const portfolio = await db.portfolio.findUnique({
    where: { id },
  });

  if (!portfolio) {
    return Response.json({ message: "Portfolio not found" }, { status: 404 });
  }

  await db.portfolio.update({
    where: { id },
    data: { completedAt: new Date() },
  });

  return Response.json(
    { message: "Successfully make this portfolio to completed" },
    { status: 200 }
  );
}
