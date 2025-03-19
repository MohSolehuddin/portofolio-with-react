import { SocialMediaType } from "@/lib/schema/socialMedia";
import { db } from "@/server/db";

export const getAllSocialMedia = async () => {
  return await db.socialMedia.findMany();
};

export const createSocialMedia = async (data: SocialMediaType) => {
  return await db.socialMedia.create({ data });
};
