// pages/api/schools/upload.js

import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';

// Disable Next.js built-in body parser (we handle form-data manually)
export const config = {
  api: {
    bodyParser: false,
  },
};

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

  const form = new IncomingForm();
  form.multiples = true; // allow multiple files

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ error: 'Error parsing files' });
    }

    // Get uploaded files under 'images' field
    let fileArray = [];
    if (Array.isArray(files.images)) {
      fileArray = files.images;
    } else if (files.images) {
      fileArray = [files.images];
    } else {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    try {
      // Upload all files to Cloudinary under "schools" folder
      const uploadPromises = fileArray.map((file) =>
        cloudinary.uploader.upload(file.filepath, {
          folder: 'schools',
        })
      );

      const uploadResults = await Promise.all(uploadPromises);

      // Remove temporary files from server
      fileArray.forEach((file) => fs.unlinkSync(file.filepath));

      // Extract secure URLs to return
      const urls = uploadResults.map((result) => result.secure_url);

      return res.status(200).json({ urls });
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return res.status(500).json({ error: 'Failed to upload images to Cloudinary' });
    }
  });
}
