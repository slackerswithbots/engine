const express = require('express');

const routes = function(Event){
    // on routes that end in /event
    // ----------------------------------------------------
    const eventRouter = express.Router();

    // on routes that end in /event/:event_id
    // ----------------------------------------------------
    eventRouter.route('/event/:event_id')

    // get the event with that id (accessed at GET /event/:event_id)
    .get(function(req, res) {
        Event.findById(req.params.event_id, function(err, event) {
            if (err)
                res.send(err);
            res.json(event);
        });
    })

     // update the event with this id (accessed at PUT /event/:event_id)
    .put(function(req, res, next) {

        // use our event model to find the event we want
        Event.findById(req.params.event_id, function(err, event) {

            if (err)
                res.send(err);
            try {
                event.eventName = req.body.eventName;  
                event.eventType = req.body.eventType;  
                event.eventCategory = req.body.eventCategory;  
                event.location = {};
                event.location.long = parseFloat(req.body.locationLong);  
                event.location.lat = parseFloat(req.body.locationLat);  
                event.dateTime = new Date(req.body.dateTime);  
                event.description = req.body.description;  
            } catch(err){
                next(err);
            }

            // save the event
            event.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'event updated!' });
            });

        });
    })
    // delete the event with this id (accessed at DELETE /event/:event_id)
    .delete(function(req, res) {
        Event.remove({
            _id: req.params.event_id
        }, function(err, event) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

    return eventRouter;
}
module.exports = routes;
