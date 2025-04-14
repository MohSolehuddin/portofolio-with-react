import { createErrorLog } from "@/data/errorLog";
import { deletePortfolio, updatePortfolio } from "@/data/portfolio";
import { PortfolioSchema } from "@/lib/schema/portfolioSchema";
import { db } from "@/server/db";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const portfolio = await db.portfolio.findUnique({
      where: { id },
    });

    if (!portfolio) {
      return Response.json({ message: "Portfolio not found" }, { status: 404 });
    }

    return Response.json({ data: portfolio }, { status: 200 });
  } catch (error) {
    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { message: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id)
      return Response.json({ message: "id is required" }, { status: 400 });

    const deletedPortfolio = await deletePortfolio(id);
    return Response.json({ data: deletedPortfolio }, { status: 200 });
  } catch (error) {
    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { message: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id)
      return Response.json({ message: "id is required" }, { status: 400 });

    const data = await req.json();

    const validatedData = PortfolioSchema.safeParse(data);
    if (!validatedData.success)
      return Response.json(validatedData.error, { status: 400 });

    const updatedPortfolio = await updatePortfolio(id, {
      ...validatedData.data,
    });

    return Response.json({ data: updatedPortfolio }, { status: 200 });
  } catch (error) {
    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { message: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
}
