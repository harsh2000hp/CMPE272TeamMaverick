var express = require('express');
var path = require('path');
var cors = require('cors');


var index = require('./routes/Routes');

var app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', index);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

module.exports = app;