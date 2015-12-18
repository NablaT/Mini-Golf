var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

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
var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});