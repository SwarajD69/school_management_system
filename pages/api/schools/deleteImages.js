// pages/api/schools/deleteImages.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { images } = req.body;

  if (!Array.isArray(images)) {
    return res.status(400).json({ error: 'Invalid image list' });
  }

  const uploadDir = path.join(process.cwd(), 'public/schoolImages');

  try {
    images.forEach(img => {
      const filePath = path.join(uploadDir, img);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
    return res.status(200).json({ message: 'Images deleted' });
  } catch (err) {
    console.error('Error deleting images:', err);
    return res.status(500).json({ error: 'Failed to delete images' });
  }
}
