const express = require('express');

const routes = function(Activity){
    // on routes that end in /activity
    // ----------------------------------------------------
    const activityRouter = express.Router();

    // on routes that end in /activity/:activity_id
    // ----------------------------------------------------
    activityRouter.route('/activity/:activity_id')

    // get the event with that id (accessed at GET /activity/:activity_id)
    .get(function(req, res) {
        Activity.findById(req.params.activity_id, function(err, event) {
            if (err)
                res.send(err);
            res.json(event);
        });
    })

     // update the event with this id (accessed at PUT /activity/:activity_id)
    .put(function(req, res) {

        // use our event model to find the event we want
        Activity.findById(req.params.activity_id, function(err, event) {

            if (err)
                res.send(err);

            event.name = req.body.name;  // update the activities info

            // save the event
            event.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'event updated!' });
            });

        });
    })
    // delete the event with this id (accessed at DELETE /activity/:activity_id)
    .delete(function(req, res) {
        Activity.remove({
            _id: req.params.activity_id
        }, function(err, event) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

    return activityRouter;
}
module.exports = routes;
