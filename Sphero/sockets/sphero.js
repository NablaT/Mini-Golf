/**
 * Created by grahbari on 21/12/2015.
 */

var sphero = require("sphero");
var orb = sphero("/dev/tty.Sphero-BPW-AMP-SPP");
var io = require("../core/core.js").getIO();

var keypress = require('keypress');

var socket = io.connect('http://localhost:3000/sphero');

socket.on('hello', function (params) {
    console.log('hello');
    orb.roll(100, 0);
});

/**
 * Permet de se connecter à la sphero.
 */
socket.on('Connexion', function (params) {
    orb.connect(listen);
});

function handle(ch, key) {

    console.log('got "keypress"', key);
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }

    if (key.name === "b") {
        orb.color("red");
    }

    if (key.name === "s") {
        orb.startCallibration();
    }

    if (key.name === "f") {
        orb.finishCalibration();
    }

    if (key.name === "up") {
        orb.roll(0,60);
    }

    if (key.name === "down") {
        orb.roll(0,180);
    }

    if (key.name === "left") {
        orb.roll(270,60);
    }

    if (key.name === "right") {
        orb.roll(90,60);
    }

    if (key.name === "space") {
        orb.stop();
    }
}

function listen() {
    keypress(process.stdin);
    process.stdin.on('keypress', handle);

    console.log("starting to listen for arrow key presses");

    process.stdin.setRawMode(true);
    process.stdin.resume();
}