const express = require('express');
const mongoose = require('mongoose');
const Eureka = require('eureka-js-client').Eureka;
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//Route
const serverPort = process.env.SERVER_PORT || 3000;

const CategoryRoute = require('./route/CategoryRoute');
const CountriesRoute = require('./route/CountryRoute');
const DiscountRoute = require('./route/DiscountRoute');
const ProductRoute = require('./route/ProductRoute');
const CartRoute = require('./route/CartRoute');
const BookmarkRoute = require('./route/BookmarkRoute');
const ReviewRoute = require('./route/ReviewRoute');


/*===============================*/
const eurekaClient = new Eureka({
    instance: {
        app: 'product-service-api',
        instanceId: `product-service-api:${serverPort}`,
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
            '$': parseInt(serverPort),
            '@enabled': true
        },
        vipAddress: 'product-service-api',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn'
        }
    },
    eureka: {
        host: '127.0.0.1',
        port: 8761,
        servicePath: '/eureka/apps/'
    }
});
eurekaClient.start(function (error) {
    console.log(error || 'eureka registration is complete!')
})
/*===============================*/




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

app.use('/product-service-api/api/v1/categories', CategoryRoute);
app.use('/product-service-api/api/v1/countries', CountriesRoute);
app.use('/product-service-api/api/v1/discount', DiscountRoute);
app.use('/product-service-api/api/v1/product', ProductRoute);
app.use('/product-service-api/api/v1/cart', CartRoute);
app.use('/product-service-api/api/v1/boomark', BookmarkRoute);
app.use('/product-service-api/api/v1/review', ReviewRoute);


// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));