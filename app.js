var express = require('express');
var    db = require('./db');

var app = express();

app.configure(function () {
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

app.get('/users/:user,:email', function(req, res) {
res.send({user:req.params.user, email:req.params.email});
});
app.get('/wines/:id', function(req, res) {
res.send({id:req.params.id, name: "The Name", description: "description"});
});
db.connectDB();
app.post('/user', db.adduser);
//app.get('/wines', wine.findAll);
//app.get('/wines/:id', wine.findById);
//app.put('/wines/:id', wine.updateWine);
//app.delete('/wines/:id', wine.deleteWine);

app.listen(3000);
console.log('Listening on port 3000...');
