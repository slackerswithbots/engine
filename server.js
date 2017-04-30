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

// Url Settings
const PORT = process.env.PORT || 8080;        // set our port
const apiPrefix = process.env.APP_API_VERSION || '/api/v1';

// Mongoose
const mongoose   = require('mongoose');
const MONGO_URI =  process.env.MONGO_URI || 'mongodb://localhost:27017/Juco';
mongoose.connect(MONGO_URI); // connect to our database


// Models
const Event = require('./app/models/event.js');

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();
const apiRouter = express.Router();
const eventRoutes = require('./app/routes/eventRoutes.js')(Event);
const eventsRoutes = require('./app/routes/eventsRoutes.js')(Event);

// Catch-all
app.use(function timeLog(req, res, next) {
  console.log('Location: ', req.url);
  console.log('Data: ', req.body);
  console.log('Method: ', req.method);
  console.log('Time: ', Date.now());
  next();
});

// test route to make sure everything is working (accessed at GET /)
router.get('/', function(req, res) {
    res.json({ message: 'no one is home' });   
});

// test route to make sure everything is working (accessed at GET /api)
apiRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(apiPrefix, apiRouter);
app.use(apiPrefix, eventRoutes);
app.use(apiPrefix, eventsRoutes);
app.use('/', router);

// Catch all errors
app.use(function (err, req, res, next) {
    if (err.stack)
        console.error(err.stack);
  res.status(500).send('Something broke!')
});

// START THE SERVER
// =============================================================================
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
