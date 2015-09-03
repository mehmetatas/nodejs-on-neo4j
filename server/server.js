var express = require('express');
var bodyParser = require('body-parser');
var user = require('./controllers/user');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("../client"));

app.use('/api/user', user);

app.set('port', 8888);

var server = app.listen(app.get('port'), function () {
    console.log("Server started on port", app.get('port'));
});

module.exports = app;