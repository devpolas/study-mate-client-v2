import axios from "axios";

export async function uploadImageToImgBB(
  name: string,
  image: File
): Promise<string | null> {
  if (!name || !image) {
    return null;
  }
  const formData = new FormData();
  formData.append("image", image);
  formData.append("name", name.replace(/\s+/g, "-"));

  const response = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );

  return response.data.data.url;
}
