/////////////////////////////////                       Base                           /////////////////////////////////
var logger     = require('morgan'),
    bodyParser = require('body-parser');

/////////////////////////////////                       Core                           /////////////////////////////////
var http = require('./core/core.js').getHttp(),
    app  = require('./core/core.js').app;

/////////////////////////////////                 Routers inclusion                    /////////////////////////////////

var ecranRouter      = require('./webAPI/ecran.js'),
    smartphoneRouter = require('./webAPI/smartphone.js'),
    kinectRouter     = require('./webAPI/kinect.js').router;

/////////////////////////////////                     Sockets                          /////////////////////////////////
require('./sockets/sphero.js');
require('./sockets/ecran.js');
require('./sockets/smartphone.js');

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
app.use('/ecran', ecranRouter);
app.use('/smartphone', smartphoneRouter);
app.use('/kinect', kinectRouter);

/**
 * Server on port 3000.
 */
http.listen(3000, function () {

    console.log('Backend Mini Golf started and ready ...');

});
