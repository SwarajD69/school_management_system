// pages/api/schools/index.js

import db from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        name,
        address,
        city,
        state,
        contact,
        email_id,
        images, // Expecting an array of image URLs from Cloudinary
      } = req.body;

      // Basic validation
      if (
        !name ||
        !address ||
        !city ||
        !state ||
        !contact ||
        !email_id ||
        !images ||
        !Array.isArray(images) ||
        images.length === 0
      ) {
        return res.status(400).json({ error: 'All fields and at least one image are required.' });
      }

      console.log('📥 Received new school:', req.body);

      // Insert school record with images stored as JSON string
      await db.execute(
        `INSERT INTO schools (name, address, city, state, contact_number, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, address, city, state, contact, JSON.stringify(images), email_id]
      );

      return res.status(201).json({ message: '✅ School added successfully' });
    } catch (error) {
      console.error('❌ Error inserting school:', error);
      return res.status(500).json({ error: error.message || 'Server error: failed to add school' });
    }
  } 
  else if (req.method === 'GET') {
    try {
      const [rows] = await db.execute('SELECT * FROM schools ORDER BY id DESC');

      // Map over the rows and parse image JSON string back to array
      const schools = rows.map((school) => {
        let images = [];
        if (school.image) {
          try {
            images = JSON.parse(school.image);
            // Fallback: if it's not an array, wrap it into an array
            if (!Array.isArray(images)) {
              images = [school.image];
            }
          } catch {
            // If JSON parse fails, just use the raw value wrapped in array
            images = [school.image];
          }
        }
        return {
          ...school,
          images, // consistent plural naming for frontend usage
        };
      });

      return res.status(200).json(schools);
    } catch (error) {
      console.error('❌ Error fetching schools:', error);
      return res.status(500).json({ error: 'Failed to fetch schools' });
    }
  } 
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
