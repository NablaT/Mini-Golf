var logger = require('morgan');
var bodyParser = require('body-parser');

var http = require('./core/core.js').getHttp();
var app = require('./core/core.js').app;
require('./sockets/sphero.js');

/**
 * Utilisation du logger en mode développement.
 */
app.use(logger('dev'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

/**
 * Permet de définir les autorisations pour les requêtes HTTP.
 */
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Définit qui a le droit d'appeler le serveur.
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS"); // Définit les méthodes qu'on a le droit d'utiliser.
    next();
});

/**
 * Permet de créer un serveur qui écoute sur le port 3000.
 * @type {http.Server}
 */
http.listen(3000, function () {

    console.log('Example app listening');

});