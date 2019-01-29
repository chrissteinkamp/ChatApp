//server.js

//first we import our dependencies…
var express = require('express');
//set our port to either a predetermined port number if you have set it up, or use 8000
var port = process.env.API_PORT || 8000;

var jwt = require('express-jwt');
//var cors = require('cors');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//and create our instances
var app = express();
var router = express.Router();



var authCheck = jwt({
  secret: '2aUL9j8kMdfAhfcHC-Teho_HswwplwkECxPMNIzXfSP5m09QvKyWMoZSH6GrhkKx',
  audience: 'LOpU37x7pD5fRJugBbcX8wU0R3mCoPrP'
});

//database connection using mongoose
var options = {server: {socketOptions: {keepAlive: 1}}};
//mongoose.Promise = global.Promise;
var connectionString = 'mongodb://chris:password@ds143980.mlab.com:43980/commentdb';
mongoose.connect(connectionString, options);

// Connected handler
mongoose.connection.on('connected', function(err) {
    console.log("Connected to DB using chain: " + connectionString);
    if (err) {
        console.log(err);
    }
});

// Error handler
mongoose.connection.on('error', function(err) {
    console.log(err);
});


//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//app.use(cors());

//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent comments
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//now we can set the route path & initialize the API
router.get('/', function(req, res) {
    res.json({
        message: 'API Initialized!'
    });
});

var comments = require('./routes/comments');
var rooms = require('./routes/rooms');
var users = require('./routes/users');
var friends = require('./routes/friends');


app.use('/api/comments',  authCheck, comments);
app.use('/api/rooms', rooms);
app.use('/api/users',  users);
app.use('/api/friends', friends);


//starts the server and listens for requests
app.listen(port, function() {
    console.log(`api running on port ${port}`);
});