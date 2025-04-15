import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  secure: true,
});

/**
 * Upload buffer ke Cloudinary
 * @param buffer Buffer dari file
 * @returns Promise<UploadApiResponse>
 */
const uploadToCloudinary = (buffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "catalog_uploads" },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (error || !result) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

const updateImageInCloudinary = async (publicId: string, buffer: Buffer) => {
  await deleteFromCloudinary(publicId);
  return await uploadToCloudinary(buffer);
};

/**
 * Hapus file dari Cloudinary berdasarkan publicId
 * @param publicId ID publik dari file di Cloudinary
 * @returns Promise<{ result: string }>
 */
const deleteFromCloudinary = (
  publicId: string
): Promise<{ result: string }> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) return reject(error);
      resolve(result as { result: string });
    });
  });
};

export {
  cloudinary,
  deleteFromCloudinary,
  updateImageInCloudinary,
  uploadToCloudinary,
};
