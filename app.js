var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var csrf = require('csurf');

var app = express();
var handlers = {};

handlers.api = {};
handlers.api.product = require('./desktop.bundles/api/api-controller');

app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'desktop.bundles'));
app.set('view engine', 'jade');

//app.use(csrf);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Routes :: API
app.get('/api/*', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.get('/api/product', handlers.api.product.getProduct);

app.get('/api/*', function (req, res) {
    res.status(404);
    res.end(JSON.stringify({ 'status': 'ERROR', 'code': 404, 'message': 'API method is not implemented' }));
});


// Routes :: Pages
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.render('compare/compare-view.jade');
});


// Static (the best case is delegate to nginx)
app.use('/static', express.static(__dirname + '/desktop.bundles'));


// Errors handling
app.get('*', function (req, res) {
    res.status(404);
    res.render('error/error-view.jade', { 'error': {'status': 'ERROR', 'code': 404, 'message': 'Page not found'} });
});

app.use(function (err, req, res) {
    res.status(500);
    res.render('error/error-view.jade', { 'error': {'status': 'ERROR', 'code': 500, 'message': JSON.stringify(err)} });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
