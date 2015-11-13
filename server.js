/**
 * Created by Nitin on 04-11-2015.
 */
// set up ========================
var application_root = __dirname;
var express  = require('express');
var app = express();                  // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var path = require("path");
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


// configuration =================


app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(application_root));

app.get('/api', function (req, res) {
    res.send('Bowling is running!!!');
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// Launch server
app.listen(4242);