const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const serverPort = process.env.SERVER_PORT || 3000;

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
