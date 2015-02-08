var express = require('express');
var app = express();

app.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

app.use(express.static(__dirname + '/bin'));

app.listen(8080);
