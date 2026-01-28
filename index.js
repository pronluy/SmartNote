// pages/api/notes/index.js
import { createNote, getNotesByUserId } from '../../../lib/db';
import { getUserFromRequest } from '../../../lib/auth';

export default async function handler(req, res) {
  const user = getUserFromRequest(req);
  
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    // Get all notes for user
    try {
      const result = await getNotesByUserId(user.userId);
      if (!result.success) {
        return res.status(500).json({ message: 'Error fetching notes' });
      }
      res.status(200).json({ notes: result.notes });
    } catch (error) {
      console.error('Get notes error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    // Create new note
    try {
      const { title, content, summary, noteType, audioUrl } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }

      const result = await createNote(
        user.userId,
        title,
        content,
        summary || null,
        noteType || 'manual',
        audioUrl || null
      );

      if (!result.success) {
        return res.status(500).json({ message: 'Error creating note' });
      }

      res.status(201).json({ message: 'Note created', note: result.note });
    } catch (error) {
      console.error('Create note error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
