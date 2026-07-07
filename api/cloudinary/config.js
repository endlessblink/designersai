import { requireUser } from "../_lib/auth.js";
import { json } from "../_lib/http.js";

export default async function handler(req, res) {
  try {
    requireUser(req);

    return json(res, 200, {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME || null,
      uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || process.env.VITE_CLOUDINARY_UPLOAD_PRESET || null,
    });
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message || "Cloudinary config failed" });
  }
}
