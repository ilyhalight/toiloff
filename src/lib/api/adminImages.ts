import { AVATAR_BASE_URL, fetchFromAPI, IMAGES_BASE_URL } from "./internal";

export type ImageEntry = {
  id: string;
};

export type ImageList = string[];

export const upload = async (image: File) => {
  const formdata = new FormData();
  formdata.append("file", image);
  return await fetchFromAPI<ImageEntry>("admin/images", formdata);
};

export const get = (imageId: string) => {
  return `${IMAGES_BASE_URL}${encodeURIComponent(imageId)}`;
};

export const getAvatar = (imageId: string) => {
  return `${AVATAR_BASE_URL}${encodeURIComponent(imageId)}`;
};

export const getAll = async () => await fetchFromAPI<ImageList>("admin/images");
export const getAvatars = async () => await fetchFromAPI<ImageList>("admin/images/avatars");

export const deleteImage = async (imageId: string) =>
  await fetchFromAPI<ImageEntry>(`admin/images/${imageId}`, undefined, undefined, {
    method: "DELETE",
  });
