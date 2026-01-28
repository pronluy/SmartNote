// pages/api/notes/[id].js
import { getNoteById, updateNote, deleteNote } from '../../../lib/db';
import { getUserFromRequest } from '../../../lib/auth';

export default async function handler(req, res) {
  const user = getUserFromRequest(req);
  
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    // Get single note
    try {
      const note = await getNoteById(id, user.userId);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.status(200).json({ note });
    } catch (error) {
      console.error('Get note error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    // Update note
    try {
      const { title, content, summary } = req.body;
      const result = await updateNote(id, user.userId, { title, content, summary });

      if (!result.success) {
        return res.status(500).json({ message: 'Error updating note' });
      }

      res.status(200).json({ message: 'Note updated', note: result.note });
    } catch (error) {
      console.error('Update note error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    // Delete note
    try {
      const result = await deleteNote(id, user.userId);

      if (!result.success) {
        return res.status(500).json({ message: 'Error deleting note' });
      }

      res.status(200).json({ message: 'Note deleted' });
    } catch (error) {
      console.error('Delete note error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
