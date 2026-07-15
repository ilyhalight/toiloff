import { z } from "astro/zod";
import { AVATAR_BASE_URL, fetchFromAPI, IMAGES_BASE_URL } from "./internal";

export const ImageEntry = z.object({
  id: z.string(),
});

export type ImageEntry = z.infer<typeof ImageEntry>;

export const ImageList = z.array(z.string());
export type ImageList = z.infer<typeof ImageList>;

export const AdminImagesRouteAPI = {
  upload: async (image: File) => {
    const formdata = new FormData();
    formdata.append("file", image);
    return await fetchFromAPI<ImageEntry>("admin/images", formdata);
  },
  get: (imageId: string) => {
    return `${IMAGES_BASE_URL}${encodeURIComponent(imageId)}`;
  },
  getAvatar: (imageId: string) => {
    return `${AVATAR_BASE_URL}${encodeURIComponent(imageId)}`;
  },
  getAll: async () => await fetchFromAPI<ImageList>("admin/images"),
  getAvatars: async () => await fetchFromAPI<ImageList>("admin/images/avatars"),
  delete: async (imageId: string) =>
    await fetchFromAPI<ImageEntry>(
      `admin/images/${imageId}`,
      undefined,
      undefined,
      {
        method: "DELETE",
      },
    ),
};
