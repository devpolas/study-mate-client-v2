import axios from "axios";

export async function uploadImageToImgBB(name, image) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("name", name.replace(/\s+/g, "-"));

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`,
      formData
    );

    return response.data.data.url;
  } catch (error) {
    console.error("ImgBB upload failed:", error);
    throw new Error("Failed to upload image");
  }
}
