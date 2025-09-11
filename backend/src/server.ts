import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());


const ITEMS = Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
    text: `Item ${i + 1}`,

}));

app.get('/api/items', (req, res) => {
    res.json({items: ITEMS});
});

app.get('/api/items/search', (req, res) => {
    const q = String(req.query.q).toLowerCase();
    const filteredItems = ITEMS.filter(item => item.text.toLowerCase().includes(q));
    res.json({items: filteredItems});
});
    

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
