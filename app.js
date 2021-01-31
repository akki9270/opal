const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes')
dotenv.config('dev');
const { TIMELOGGER } = require('./winston');
const PORT = process.env.PORT || 8075;
const app = express();

// To iniate database connection and table creation
require('./models');

// middlewares
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(cookieParser())

app.use("/api", authRoutes);
exports.startServer = () => {
    app.listen(PORT,() => {
        console.log(`Running on port ${PORT}`);
    });
}