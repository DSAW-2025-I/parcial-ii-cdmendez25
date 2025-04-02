const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const products = [
    {
      "id": 1,
      "name": "Auriculares inalámbricos",
      "price": 49.99
    },
    {
      "id": 2,
      "name": "Teclado mecánico RGB",
      "price": 89.50
    },
    {
      "id": 3,
      "name": "Mochila impermeable",
      "price": 34.25
    },
    {
      "id": 4,
      "name": "Lámpara LED de escritorio",
      "price": 22.75
    }
];  

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.post('/products', (req, res) => {
    const { id, name, price } = req.body;
  
    if (!id || !name || !price) {
      return res.status(400).json({ error: 'Faltan campos: id, name o price' });
    }
  
    const existing = products.find(p => p.id === id);
    if (existing) {
      return res.status(400).json({ error: 'Ya existe un producto con ese ID' });
    }
  
    const newProduct = { id, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
  });

app.listen(port, () => {
    console.log('App listening on port', port);
});