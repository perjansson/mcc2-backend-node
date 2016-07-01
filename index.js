var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Meeting = require('./models/meeting');

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/meetings', (request, response) => {
  Meeting.find(function(err, meetings) {
    if (err) {
      response.send(err);
    }
    response.json(meetings);
  });
});

app.post('/meetings', (request, response) => {
  var meeting = new Meeting(request.body);
  meeting.save(function(err) {
    if (err) {
      response.send(err);
    }
    response.json(meeting);
  });
});

app.delete('/meetings', (request, response) => {
  Meeting.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      response.end('Deleted meetings');
    }
  });
});

app.listen(app.get('port'), console.log('Node app is running on port... ', app.get('port')));

var dbConnectionPath = process.env.MONGODB_URI || 'mongodb://localhost/mcc2';
mongoose.connect(dbConnectionPath, (err, res) => {
  if (err) {
    console.log('Error connecting to: ' + dbConnectionPath + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + dbConnectionPath);
  }
});
