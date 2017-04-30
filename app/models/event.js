var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
    eventName: String,
    eventType: String,
    eventCategory: String,
    location: {
        long: Number,
        lat: Number,
    },
    dateTime: Date,
    description: String,
    url: String
});

module.exports = mongoose.model('Event', EventSchema);