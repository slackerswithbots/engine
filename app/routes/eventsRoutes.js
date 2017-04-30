const express = require('express');

const routes = function(Event){
    // on routes that end in /events
    // ----------------------------------------------------
    const eventsRouter = express.Router();

    // on routes that end in /events
    // ----------------------------------------------------
    eventsRouter.route('/events')

    // get the event with that id (accessed at POST /events)
    .post(function(req, res) {
        
        const event = new Event(); // create a new instance of the event model
        event.name = req.body.name;  // set the events name (comes from the request)

        // save the event and check for errors
        event.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'event created!' });
        });
        
    })
     // update the event with this id (accessed at GET /events)
    .get(function(req, res) {
        Event.find(function(err, events) {
            if (err)
                res.send(err);

            res.json(events);
        });
    });

    return eventsRouter;
}
module.exports = routes;
