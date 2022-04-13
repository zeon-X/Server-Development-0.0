const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors');

const app = express();
env.config();

const bookRoute = require('./route/book');
const memberRoute = require('./route/member');


app.use(express.json());
mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.gnws6.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`)
    .then(console.log('db connected....'));

app.use(cors());
app.use('/api', bookRoute);
app.use('/api', memberRoute);



app.listen(3001, () => {
    console.log('listening..');
})