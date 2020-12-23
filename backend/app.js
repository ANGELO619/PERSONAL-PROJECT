const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const app = express();

const productRoutes = require('./product/productRoutes');
const cartRoutes = require('./cart/cartRoutes');

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', 'https://jasmine-ecommerce.web.app');
    res.set('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Headers', 'Authorization');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {
        next()
    }
})

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

module.exports = app
