// pages/api/auth/register.js
import { createUser, getUserByEmail } from '../../../lib/db';
import { hashPassword, generateToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const result = await createUser(email, hashedPassword, name || email.split('@')[0]);

    if (!result.success) {
      return res.status(500).json({ message: 'Error creating user' });
    }

    // Generate token
    const token = generateToken(result.user.id, result.user.email);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
