// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express    = require('express');        // call express
const app        = express();                 // define our app using express
const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;        // set our port
const apiPrefix = process.env.APP_API_VERSION || '/api/v1';

// Models
var Event = require('./app/models/event');

// ROUTES FOR OUR API
// =============================================================================
const apiRouter = express.Router();              // get an instance of the express Router
const router = express.Router();              // get an instance of the express Router

// Catch-all
app.use(function timeLog(req, res, next) {
  console.log('Location: ', req.url);
  console.log('Data: ', req.body);
  console.log('Method: ', req.method);
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
    res.json({ message: 'no one is home' });   
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
apiRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);
app.use(apiPrefix, apiRouter);

// START THE SERVER
// =============================================================================
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
