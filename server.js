// require dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// set port
var app = express();
var PORT = process.env.PORT;

// pull in assets
app.use(express.static(path.join(__dirname, './app/public')));

// data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

// pulls in routes
require(path.join(__dirname, './app/routing/apiRoutes'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes'))(app);

// server port alert
app.listen(PORT, function() {
  console.log('Friend Finder app is listening on PORT: ' + PORT);
});