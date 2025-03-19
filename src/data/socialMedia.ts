import { SocialMediaType } from "@/lib/schema/socialMedia";
import { db } from "@/server/db";

export const getAllSocialMedia = async () => {
  return await db.socialMedia.findMany();
};

export const createSocialMedia = async (data: SocialMediaType) => {
  return await db.socialMedia.create({ data });
};

export const deleteSocialMedia = async (id: string) => {
  return await db.socialMedia.delete({ where: { id } });
};

export const updateSocialMedia = async (id: string, data: SocialMediaType) => {
  return await db.socialMedia.update({ where: { id }, data });
};
