const express = require('express');

// on routes that end in /events
// ----------------------------------------------------
var eventRouter = express.Router();

var routes = function(){
    //=====/events
    router.route('/events')
    // create a event (accessed at POST http://localhost:8080/api/events)
    .post(function(req, res) {
        
        const event = new Event();      // create a new instance of the event model
        event.name = req.body.name;  // set the events name (comes from the request)

        // save the event and check for errors
        event.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'event created!' });
        });
        
    })
    // get all the events (accessed at GET http://localhost:8080/api/events)
    .get(function(req, res) {
        Event.find(function(err, events) {
            if (err)
                res.send(err);

            res.json(events);
        });
    });

    // on routes that end in /events/:event_id
    // ----------------------------------------------------
    router.route('/events/:event_id')

    // get the event with that id (accessed at GET http://localhost:8080/api/events/:event_id)
    .get(function(req, res) {
        Event.findById(req.params.event_id, function(err, event) {
            if (err)
                res.send(err);
            res.json(event);
        });
    })

     // update the event with this id (accessed at PUT http://localhost:8080/api/events/:event_id)
    .put(function(req, res) {

        // use our event model to find the event we want
        Event.findById(req.params.event_id, function(err, event) {

            if (err)
                res.send(err);

            event.name = req.body.name;  // update the events info

            // save the event
            event.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'event updated!' });
            });

        });
    })
    // delete the event with this id (accessed at DELETE http://localhost:8080/api/events/:event_id)
    .delete(function(req, res) {
        Event.remove({
            _id: req.params.event_id
        }, function(err, event) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
}
module.exports = routes;
