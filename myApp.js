/**
 * Created by aselims on 1/14/14.
 */

var express = require('express'),
    path = require('path'),
    http = require('http'),
    eventsdb = require('./routes/eventsdb');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
        //app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/events', eventsdb.findAll);
app.post('/events', eventsdb.addOneEvent);
app.get('/events/:id', eventsdb.findOneEvent);
app.put('/events/:id', eventsdb.updateEvent);
app.delete('/events/:id', eventsdb.deleteEvent);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
