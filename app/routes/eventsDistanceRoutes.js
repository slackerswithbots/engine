const express = require('express');

const routes = function(Event, distance){
    // on routes that end in /events/distance
    // ----------------------------------------------------
    const eventsDistanceRouter = express.Router();

    // on routes that end in /events/distance
    // ----------------------------------------------------
    eventsDistanceRouter.route('/events/distance')

    // get the event with that id (accessed at POST /events/distance)
    .post(function(req, res, next) {
        try {
            location = {};
            location.long = parseFloat(req.body.locationLong);  
            location.lat = parseFloat(req.body.locationLat);  
        } catch(err){
            next(err);
        }

        Event.aggregate([{ $match: { 
            location: { $type: "object" }, 
            "location.long": { "$exists": true},
            "location.lat": { "$exists": true},
        }},{$project: { location: 1 }
        }], function(err, results){
            output = results.filter(function(value){
                eachLocation = value.location;
                myDistance = distance(eachLocation.lat,eachLocation.long, location.lat, location.long);
                if (isNumber(myDistance) && myDistance <= 5){
                    return true
                }
                return false
            });
            if (output && output.length > 0)
                res.json(output);
            res.status(400).send('Objects not found');
        });
        
    });
    return eventsDistanceRouter;
};
const isNumber = (obj) => {
  return obj!== undefined && typeof(obj) === 'number' && !isNaN(obj);
}

module.exports = routes;
