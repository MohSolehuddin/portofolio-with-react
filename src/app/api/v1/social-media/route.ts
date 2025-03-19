import { createErrorLog } from "@/data/errorLog";
import { createSocialMedia, getAllSocialMedia } from "@/data/socialMedia";
import { socialMediaSchema } from "@/lib/schema/socialMedia";

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

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    const validatedData = socialMediaSchema.safeParse(data);
    if (!validatedData.success) return Response.json(validatedData.error);
    const createdSocialMedia = await createSocialMedia(validatedData.data);
    return Response.json(
      { message: "successfully create social media", data: createdSocialMedia },
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
