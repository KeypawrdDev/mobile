import jwt from 'jsonwebtoken';

// Simple JWT secret
const JWT_SECRET = 'my-simple-secret';

// Simple user (no password for now)
const USERS = [
  { id: '1', email: 'test@example.com', name: 'Test User' }
];

// Generate JWT token
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Find user by email
export const findUserByEmail = (email: string) => {
  return USERS.find(u => u.email === email);
};

// Add new user
export const addUser = (email: string, name: string) => {
  const newUser = {
    id: String(USERS.length + 1),
    email,
    name
  };
  
  USERS.push(newUser);
  return newUser;
};

// Check if user exists
export const userExists = (email: string) => {
  return USERS.some(u => u.email === email);
};

// Verify JWT token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.sendStatus(401);
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.sendStatus(403);
  }

  req.user = decoded;
  next();
};
