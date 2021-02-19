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
 // prevent CORS problems
 app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyparser.json());

app.use("/api", authRoutes);
exports.startServer = () => {
    app.listen(PORT,() => {
        console.log(`Running on port ${PORT}`);
    });
}