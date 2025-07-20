import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Define JWT payload type
interface UserJwtPayload {
  userId: number;
  email: string;
  name: string;
  role: string;
}

export interface AuthResult {
  success: boolean;
  user?: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
  error?: string;
}

export async function verifyToken(request: NextRequest): Promise<AuthResult> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        success: false,
        error: 'No token provided'
      };
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    const decoded = jwt.verify(token, JWT_SECRET) as UserJwtPayload;
    
    return {
      success: true,
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      }
    };

  } catch (error) {
    console.error('Token verification error:', error);
    return {
      success: false,
      error: 'Invalid token'
    };
  }
}

export function generateToken(user: {
  id: number;
  email: string;
  name: string;
  role: string;
}): string {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
} 