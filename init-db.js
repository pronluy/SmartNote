// pages/api/init-db.js
import { initDB } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const result = await initDB();
    
    if (result.success) {
      res.status(200).json({ 
        message: 'Database initialized successfully!',
        instructions: 'You can now register and login to start using the app.'
      });
    } else {
      res.status(500).json({ 
        message: 'Database initialization failed',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Init DB error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message
    });
  }
}
