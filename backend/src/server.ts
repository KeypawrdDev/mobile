import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
