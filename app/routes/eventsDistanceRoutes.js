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
        console.log('here');
        try {
            const event = new Event();
            event.location = {};
            event.location.long = parseFloat(req.body.locationLong);  
            event.location.lat = parseFloat(req.body.locationLat);  
        } catch(err){
            next(err);
        }

        Event.aggregate([{ $match: { 
            location: { $type: "object" }, 
            "location.long": { "$exists": true},
            "location.lat": { "$exists": true},
        }},{
            $project: {
                location: 1
            }
        }], function(err, results){
                console.log(results);
        });


        // // save the event and check for errors
        // event.save(function(err) {
        //     if (err)
        //         res.send(err);

        //     res.json({ message: 'event created!' });
        // });
        
    });
    //  // update the event with this id (accessed at GET /events/distance)
    // .get(function(req, res) {
    //     if(req.query && Object.keys(req.query).length > 0){
    //         console.log(req.query);            
    //         Event.find(req.query, function(err, events) {
    //             if (err)
    //                 next(err);

    //             if (events && events.length > 0)
    //                 res.json(events);
    //               res.status(400).send('Objects not found');
    //         });
    //     }
    //     else {
    //         Event.find(function(err, events) {
    //             if (err)
    //                 next(err);

    //             res.json(events);
    //         });
    //     }
    // });

    return eventsDistanceRouter;
}
module.exports = routes;
