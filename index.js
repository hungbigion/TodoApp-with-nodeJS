const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

const app = express();

app.use(morgan('dev')); 

app.use(express.json({}));
app.use(express.json({
    extended: true
}))

dotenv.config();

connectDB()

app.use('/api/todo/auth',require('./routers/user'));
app.use('/api/todo',require('./routers/todo'));


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server is listening on port: ${PORT}`.blue.underline.bold))
