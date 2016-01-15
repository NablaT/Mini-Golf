/**
 * Created by grahbari on 21/12/2015.
 */

var sphero = require("sphero");
var orb = sphero("/dev/tty.Sphero-BPW-AMP-SPP");
var io = require("../core/core.js").getIO();

var socket = io.connect('http://localhost:3000/sphero');

socket.on('hello', function (params) {
    console.log('hello');
    orb.roll(100, 0);
});

/**
 * Permet de se connecter à la sphero.
 */
socket.on('Connexion', function (params) {
    orb.connect(function () {
        // Sphero is connected, tell it to do stuff!
        orb.color("blue");
    });
});