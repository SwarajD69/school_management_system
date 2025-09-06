// pages/api/schools/deleteImages.js

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { images } = req.body;

  if (!Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty images array' });
  }

  try {
    // images array must contain Cloudinary public IDs (e.g. 'schools/xyz123')
    const deletePromises = images.map((publicId) =>
      cloudinary.uploader.destroy(publicId)
    );

    const results = await Promise.all(deletePromises);

    // Optionally, you can check results for any deletion errors

    return res.status(200).json({ message: 'Images deleted successfully', results });
  } catch (err) {
    console.error('Error deleting images:', err);
    return res.status(500).json({ error: 'Failed to delete images' });
  }
}
