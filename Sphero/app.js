/////////////////////////////////                       Base                           /////////////////////////////////
var logger     = require('morgan'),
    bodyParser = require('body-parser');

/////////////////////////////////                       Core                           /////////////////////////////////
var http = require('./core/core.js').getHttp(),
    app  = require('./core/core.js').app;

/////////////////////////////////                 Routers inclusion                    /////////////////////////////////
var router = require('./sockets/sphero.js');

/////////////////////////////////                 Logger and parsing                   /////////////////////////////////
app.use(logger('dev')); // Logger in dev mode.
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({extended: false})); // For parsing application/x-www-form-urlencoded

/**
 * HTTP header definitions.
 */
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Définit qui a le droit d'appeler le serveur.
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS"); // Définit les méthodes qu'on a le droit d'utiliser.
    next();
});

/////////////////////////////////                      Routers                         /////////////////////////////////
app.use('/', router);

/**
 * Server on port 3001.
 */
http.listen(3001, function () {

    console.log('Sphero server started and ready ...');

});