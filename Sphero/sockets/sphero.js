/**
 * Created by grahbari on 21/12/2015.
 */

var sphero = require("sphero"),
    orb    = sphero("/dev/tty.Sphero-BPW-AMP-SPP"),
    io     = require("../core/core.js").getIO(),
    socket = io.connect('http://localhost:3000/sphero');

socket.on('test', function (params) {
    test(params.dist, params.angle);
});


/**
 * Event listener.
 * This event aims to connect the computer to the sphero. (Mac user).
 */
socket.on('connectSphero', function (params) {
    connect();
});

orb.on('error', function () {
    console.error('Sphero encountered a problem during the connection.');
    console.info('Trying again to connect ...');
    connect();
});

function connect () {
    orb.connect(function () {
        console.info('Sphero successfully connected');
    });
}

function test (dist, angle) {
    orb.roll(dist, angle);
}

function handle (key, distance) {

    console.log('got "keypress"', key);

    if (key === "B") {
        orb.color("blue");
    }

    if (key === "R") {
        orb.color("red");
    }

    if (key === "S") {
        orb.startCalibration();
    }

    if (key === "F") {
        orb.finishCalibration();
    }

    if (key === "space") {
        orb.stop();
    }
}


var router = require('../core/core.js').express.Router();

/**
 * Cette route permet de récupérer les scores.
 */
router.post('/key', function (req, res, next) {
    console.log(req.body.key);
    handle(req.body.key, req.body.distance);
    res.send('ok');
});

module.exports = router;