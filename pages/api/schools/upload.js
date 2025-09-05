// pages/api/schools/upload.js

import fs from 'fs';
import path from 'path';
import multer from 'multer';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    await runMiddleware(req, res, upload.array('images', 10)); // Handle up to 10 images

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const filenames = req.files.map(file => file.filename);

    return res.status(200).json({ filenames });
  } catch (error) {
    console.error('Upload failed:', error);
    return res.status(500).json({ error: 'Failed to upload images' });
  }
}
