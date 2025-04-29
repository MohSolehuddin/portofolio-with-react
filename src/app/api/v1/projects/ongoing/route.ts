import { countOngoingProjects } from "@/data/portfolio";
import { redisClient } from "@/lib/redis/redisClient";

export async function GET() {
  try {
    const redisResult = await redisClient().get("ongoingProjects");
    let result = Number(redisResult);

    if (isNaN(result) || redisResult === null) {
      result = await countOngoingProjects();
    }

    if (result !== Number(redisResult)) {
      await redisClient().set("ongoingProjects", result);
    }

    countOngoingProjects()
      .then((count) => {
        redisClient()
          .set("ongoingProjects", count)
          .catch((err) => {
            console.error("Error updating ongoing projects in Redis:", err);
          });
      })
      .catch((err) => {
        console.error("Error during background counting:", err);
      });

    return Response.json({ data: result }, { status: 200 });
  } catch (err) {
    console.error("Error during GET request:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
