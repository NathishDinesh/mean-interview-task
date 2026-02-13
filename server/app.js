const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());


app.use(cors());

// MongoDB
require('./config/mongo');

// Routes
app.use('/api/products', require('./routes/product.routes.js'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/weather', require('./routes/weather.routes'));

app.get('/', (req, res) => {
  res.send('Server Running...');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
