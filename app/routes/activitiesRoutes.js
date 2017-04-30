const express = require('express');

const routes = function(Activity){
    // on routes that end in /activities
    // ----------------------------------------------------
    const activitiesRouter = express.Router();

    // on routes that end in /activities
    // ----------------------------------------------------
    activitiesRouter.route('/activities')

    // get the event with that id (accessed at POST /activities)
    .post(function(req, res) {
        
        const activity = new Activity(); // create a new instance of the activity model
        activity.name = req.body.name;  // set the activitys name (comes from the request)

        // save the activity and check for errors
        activity.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'activity created!' });
        });
        
    })
     // update the event with this id (accessed at GET /activities)
    .get(function(req, res) {
        Activity.find(function(err, events) {
            if (err)
                res.send(err);

            res.json(events);
        });
    });

    return activitiesRouter;
}
module.exports = routes;
