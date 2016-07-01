var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetingSchema = new Schema({
  id: String,
  numberOfAttendees: Number,
  averageHourlyRate: Number,
  currency: {
    key: String,
    name: String
  },
  name: String,
  isGoodMeeting: Boolean,
  cost: Number,
  location: {
    longitude: Number,
    latitude: Number
  }
});

var Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
