import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Function to upload videos
export const uploadVideoToCloudinary = async (videoUrl) => {
  try {
    const result = await cloudinary.uploader.upload(videoUrl, {
      resource_type: "video",
      folder: "ai-generated-videos", // Folder in Cloudinary
    });

    return result.secure_url; // Return Cloudinary video URL
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Video upload failed.");
  }
};

export default cloudinary;