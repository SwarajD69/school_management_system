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
        images, // Expecting array of image filenames
      } = req.body;

      // Basic validation
      if (!name || !address || !city || !state || !contact || !email_id || !images?.length) {
        return res.status(400).json({ error: 'All fields and at least one image are required.' });
      }

      console.log('📥 Received new school:', req.body);

      await db.execute(
        `INSERT INTO schools (name, address, city, state, contact_number, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, address, city, state, contact, JSON.stringify(images), email_id]
      );

      res.status(201).json({ message: '✅ School added successfully' });

    } catch (error) {
      console.error('❌ Error inserting school:', error);
      res.status(500).json({ error: error.message || 'Server error: failed to add school' });
    }
  } 
  else if (req.method === 'GET') {
    try {
      const [rows] = await db.execute('SELECT * FROM schools ORDER BY id DESC');

      const schools = rows.map(school => {
        let images = [];
        if (school.image) {
          try {
            images = JSON.parse(school.image);
            if (!Array.isArray(images)) {
              images = [school.image];
            }
          } catch {
            images = [school.image];
          }
        }
        return {
          ...school,
          image: images,
        };
      });

      res.status(200).json(schools);
    } catch (error) {
      console.error('❌ Error fetching schools:', error);
      res.status(500).json({ error: 'Failed to fetch schools' });
    }
  } 
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
