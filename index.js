const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('DB Connection Successful!'))
	.catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

// app.use(express.static(path.join(__dirname, '/react-ecommerce/build')));
app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '/react-ecommerce/build', 'index.html'));
// });
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 4000, () => {
	console.log('Backend server is running!');
});
