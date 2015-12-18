var logger = require('morgan');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();
var http = http = require('http').Server(app);
var io = require('socket.io-client');

var sphero = require("sphero");
var orb = sphero("/dev/tty.Sphero-BPW-AMP-SPP");

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

var socket = io.connect('http://localhost:3000/sphero');
socket.on('hello', function (params) {
    orb.connect(function() {
        // Sphero is connected, tell it to do stuff!
        orb.color("blue");

        orb.roll(100, 0);
    });
});
/**
 * Permet de créer un serveur qui écoute sur le port 3000.
 * @type {http.Server}
 */
http.listen(3001, function () {

    console.log('Example app listening');

});

/*var sphero = require("sphero");
var orb = sphero("/dev/tty.Sphero-BPW-AMP-SPP");

orb.connect(function() {
    // Sphero is connected, tell it to do stuff!
    orb.color("blue");

    orb.roll(100, 0);
});*/