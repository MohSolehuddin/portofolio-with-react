import { countCompletedProjects } from "@/data/portfolio";
import { redisClient } from "@/lib/redis/redisClient";

export async function GET() {
  try {
    const redisClientInit = await redisClient();
    const redisResult = Number(await redisClientInit.get("completedProjects"));
    let result = redisResult;

    if (!result) {
      result = await countCompletedProjects();
    }

    if (result !== redisResult) {
      await redisClientInit.set("completedProjects", result);
    }

    countCompletedProjects()
      .then((count) => {
        redisClientInit.set("completedProjects", count).catch((err) => {
          console.error("Error updating completed projects in Redis:", err);
        });
      })
      .catch((err: unknown) => {
        console.error("Error during background counting:", err);
      });

    return Response.json({ data: result }, { status: 200 });
  } catch (err) {
    console.error("Error during GET request:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
