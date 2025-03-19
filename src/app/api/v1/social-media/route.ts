import { createErrorLog } from "@/data/errorLog";
import { getAllSocialMedia } from "@/data/socialMedia";

export const GET = async () => {
  try {
    const socialMedia = await getAllSocialMedia();
    return Response.json(
      { message: "successfully get all social media", data: socialMedia },
      { status: 200 }
    );
  } catch (error) {
    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { message: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
};
