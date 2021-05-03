const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressJwt = require("express-jwt");
const authRoutes = require('./routes/auth.routes');
const calculationRoutes = require('./routes/calculation.routes');
dotenv.config('dev');
const { TIMELOGGER } = require('./winston');
const PORT = process.env.PORT || 8075;
const app = express();
const config = require('./config');

// To iniate database connection and table creation
require('./models');

// middlewares
 // prevent CORS problems
 app.use(cors())
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

// express-jwt middleware for Authentication
app.use(expressJwt(
    {
        credentialsRequired: true, 
        secret: process.env.JWT_SECRET, 
        userProperty: 'auth', 
        algorithms: ['HS256']
    }).unless(
        {
            path: config.PUBLIC_URLs
        })
    );

app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
      res.status(err.status).send({message: err.message});
      return;
    }
 next()
});
app.use("/api", authRoutes);
app.use("/api", calculationRoutes);
exports.startServer = () => {
    app.listen(PORT,() => {
        console.log(`Running on port ${PORT}`);
    });
}