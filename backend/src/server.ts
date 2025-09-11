import express from 'express';
import cors from 'cors';
import { generateToken, findUserByEmail, addUser, userExists } from './auth';

const app = express();
app.use(cors());
app.use(express.json());

const ITEMS = Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
    text: `Item ${i + 1}`,
}));

// Get all items with pagination
app.get('/api/items', (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedItems = ITEMS.slice(startIndex, endIndex);
    
    res.json({
        items: paginatedItems,
        pagination: {
            page,
            limit,
            total: ITEMS.length,
            totalPages: Math.ceil(ITEMS.length / limit),
            hasNext: page < Math.ceil(ITEMS.length / limit),
            hasPrev: page > 1
        }
    });
});

// Search items with pagination
app.get('/api/items/search', (req, res) => {
    const q = String(req.query.q).toLowerCase();
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const filteredItems = ITEMS.filter(item => 
        item.text.toLowerCase().includes(q)
    );
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);
    
    res.json({
        items: paginatedItems,
        pagination: {
            page,
            limit,
            total: filteredItems.length,
            totalPages: Math.ceil(filteredItems.length / limit),
            hasNext: page < Math.ceil(filteredItems.length / limit),
            hasPrev: page > 1
        }
    });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  
  const user = findUserByEmail(email);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const token = generateToken(user.id);
  
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

// Register endpoint
app.post('/api/auth/register', (req, res) => {
  const { email, name } = req.body;
  
  // Check if email and name are provided
  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }
  
  // Check if user already exists
  if (userExists(email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  // Add new user
  const newUser = addUser(email, name);
  
  // Generate token
  const token = generateToken(newUser.id);
  
  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    }
  });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
