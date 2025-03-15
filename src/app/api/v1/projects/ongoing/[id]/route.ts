import { db } from "@/server/db";

export async function POST(
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
    data: { completedAt: null },
  });

  return Response.json(
    { message: "Successfully make this portfolio to ongoing" },
    { status: 200 }
  );
}
