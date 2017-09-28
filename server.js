// npm Dependencies
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var friends = require('./app/data/friends.js');

// Configure express 
var app = express();
var PORT = process.env.PORT || 3000;


// Add body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

//calling style.css 
app.use(express.static('app/public'));

// Routes
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// Start listening on PORT
app.listen(PORT, function() {
  console.log('Friend-Finder is listening on PORT: ' + PORT);
});