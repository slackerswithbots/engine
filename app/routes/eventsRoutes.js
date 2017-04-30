const express = require('express');

const routes = function(Event){
    // on routes that end in /events
    // ----------------------------------------------------
    const eventsRouter = express.Router();

    // on routes that end in /events
    // ----------------------------------------------------
    eventsRouter.route('/events')

    // get the event with that id (accessed at POST /events)
    .post(function(req, res, next) {
        try {
            const event = new Event();
            event.eventName = req.body.eventName;  
            event.eventType = req.body.eventType;  
            event.eventCategory = req.body.eventCategory;  
            event.location = {};
            event.location.long = parseFloat(req.body.locationLong);  
            event.location.lat = parseFloat(req.body.locationLat);  
            event.dateTime = new Date(req.body.dateTime);  
            event.description = req.body.description;
            event.url = req.body.url;
        } catch(err){
            next(err);
        }

        // save the event and check for errors
        event.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'event created!' });
        });
        
    })
     // update the event with this id (accessed at GET /events)
    .get(function(req, res) {
        if(req.query && Object.keys(req.query).length > 0){
            console.log(req.query);            
            Event.find(req.query, function(err, events) {
                if (err)
                    next(err);

                if (events && events.length > 0)
                    res.json(events);
                res.status(400).send('Objects not found');
            });
        }
        else {
            Event.find(function(err, events) {
                if (err)
                    next(err);

                res.json(events);
            });
        }
    });

    return eventsRouter;
}
module.exports = routes;
