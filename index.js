const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');

dotenv.config();
const app = express();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log('DB Connection Successful!'))
	.catch((err) => console.log(err));

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);

app.listen(process.env.PORT || 4000, () => {
	console.log('Backend server is running!');
});
