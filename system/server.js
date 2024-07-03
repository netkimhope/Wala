const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
//const lolddos = process.env.PORT || 8357;

function lolddos () {
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 30, 
    message: "Too many requests from this IP, please try again after an hour"
});

app.use(limiter);
}

module.exports = {
  lolddos,
};