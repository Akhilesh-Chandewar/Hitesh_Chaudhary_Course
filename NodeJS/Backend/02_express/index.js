import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

app.post('/teas', (req, res) => {
    const {name , price} = req.body;
    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }
    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).json(newTea);
});

app.get('/teas', (req, res) => {
    res.status(200).json(teaData);
});

app.get('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id, 10);
    const tea = teaData.find(t => t.id === teaId);
    if (!tea) {
        return res.status(404).json({ error: 'Tea not found' });
    }
    res.status(200).json(tea);
});

app.put('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id, 10);
    const { name, price } = req.body;
    const teaIndex = teaData.findIndex(t => t.id === teaId);

    if (teaIndex === -1) {
        return res.status(404).json({ error: 'Tea not found' });
    }
    
    const tea = teaData[teaIndex];

    if (name !== undefined) {
        tea.name = name;
    }

    if (price !== undefined) {
        tea.price = price;
    }

    teaData[teaIndex] = tea;
    res.status(200).json(tea);
});


app.delete('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id, 10);
    const teaIndex = teaData.findIndex(t => t.id === teaId);
    
    if (teaIndex === -1) {
        return res.status(404).json({ error: 'Tea not found' });
    }
    
    teaData.splice(teaIndex, 1);
    res.status(204).json('Tea deleted successfully');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
