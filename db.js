// lib/db.js
import { sql } from '@vercel/postgres';

// Initialize database tables
export async function initDB() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create notes table
    await sql`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(500) NOT NULL,
        content TEXT,
        summary TEXT,
        note_type VARCHAR(50),
        audio_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create index for better query performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
    `;

    console.log('Database initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error: error.message };
  }
}

// User queries
export async function createUser(email, hashedPassword, name) {
  try {
    const result = await sql`
      INSERT INTO users (email, password, name)
      VALUES (${email}, ${hashedPassword}, ${name})
      RETURNING id, email, name, created_at;
    `;
    return { success: true, user: result.rows[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email};
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function getUserById(id) {
  try {
    const result = await sql`
      SELECT id, email, name, created_at FROM users WHERE id = ${id};
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

// Notes queries
export async function createNote(userId, title, content, summary, noteType, audioUrl) {
  try {
    const result = await sql`
      INSERT INTO notes (user_id, title, content, summary, note_type, audio_url)
      VALUES (${userId}, ${title}, ${content}, ${summary}, ${noteType}, ${audioUrl})
      RETURNING *;
    `;
    return { success: true, note: result.rows[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getNotesByUserId(userId, limit = 50, offset = 0) {
  try {
    const result = await sql`
      SELECT * FROM notes 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset};
    `;
    return { success: true, notes: result.rows };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getNoteById(noteId, userId) {
  try {
    const result = await sql`
      SELECT * FROM notes 
      WHERE id = ${noteId} AND user_id = ${userId};
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error getting note:', error);
    return null;
  }
}

export async function updateNote(noteId, userId, updates) {
  try {
    const { title, content, summary } = updates;
    const result = await sql`
      UPDATE notes 
      SET 
        title = COALESCE(${title}, title),
        content = COALESCE(${content}, content),
        summary = COALESCE(${summary}, summary),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${noteId} AND user_id = ${userId}
      RETURNING *;
    `;
    return { success: true, note: result.rows[0] };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteNote(noteId, userId) {
  try {
    await sql`
      DELETE FROM notes 
      WHERE id = ${noteId} AND user_id = ${userId};
    `;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
