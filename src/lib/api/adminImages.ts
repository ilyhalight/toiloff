import { AVATAR_BASE_URL, fetchFromAPI, IMAGES_BASE_URL } from "./internal";

export type ImageEntry = {
  id: string;
};

export type ImageList = string[];

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
