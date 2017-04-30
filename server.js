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
const Activity = require('./app/models/activity.js');

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();
const apiRouter = express.Router();
const activityRoutes = require('./app/routes/activityRoutes.js')(Activity);
const activitiesRoutes = require('./app/routes/activitiesRoutes.js')(Activity);

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
app.use(apiPrefix, activityRoutes);
app.use(apiPrefix, activitiesRoutes);
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
