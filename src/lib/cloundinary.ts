export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "wanderlog-client");

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/dbzbqq0vw/image/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Cloudinary upload failed");
    }

    const data = await response.json();
    if (!data.secure_url) {
      throw new Error("No image URL returned from Cloudinary");
    }
    return data.secure_url;
  } catch (error: any) {
    console.error("Cloudinary upload failed:", error);
    throw new Error(error.message || "Cloudinary upload failed");
  }
};
