const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser=require('body-parser');
const {urlencoded} = require("express");
const app = express();
const serverPort = process.env.SERVER_PORT || 3000;
const CategoryRoute=require('./route/CategoryRoute');
const CountriesRoute=require('./route/CountryRoute');
const DiscountRoute=require('./route/DiscountRoute');
const ProductRoute=require('./route/ProductRoute');
const CartRoute=require('./route/CartRoute');
const BookmarkRoute=require('./route/BookmarkRoute');
const ReviewRoute=require('./route/ReviewRoute');


//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());



try {
    mongoose.connect(`${process.env.DATABASE_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    app.listen(serverPort, () => {
        console.log(`server up & running on port ${serverPort}`);
    });
} catch (e) {
    console.log(e);
}

app.get('/test-api', (req, resp) => {
    return resp.json({ message: 'hi the server is Workin' });
});

app.use('/api/v1/categories', CategoryRoute);
app.use('/api/v1/countries', CountriesRoute);
app.use('/api/v1/discount', DiscountRoute);
app.use('/api/v1/product', ProductRoute);
app.use('/api/v1/cart', CartRoute);
app.use('/api/v1/boomark', BookmarkRoute);
app.use('/api/v1/review', ReviewRoute);
