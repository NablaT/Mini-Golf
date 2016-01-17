/**
 * Created by grahbari on 21/12/2015.
 */

var sphero = require("sphero"),
    orb    = sphero("/dev/tty.Sphero-BPW-AMP-SPP"),
    io     = require("../core/core.js").getIO(),
    socket = io.connect('http://localhost:3000/sphero'),
    router = require('../core/core.js').express.Router();

/**
 * A variable to know if we have start the calibration or not.
 * @type {boolean}
 */
var isInCalibrationPhase = false;

// TODO maybe to delete.
socket.on('test', function (params) {
    roll(params.dist, params.angle);
});

socket.on('startCalibration', function (params) {
    startCalibration();
});

/**
 * Event listener.
 * This event aims to connect the computer to the sphero. (Mac user).
 */
socket.on('connectSphero', function (params) {
    connect();
});

/**
 * Event error listener.
 * This event is triggered when the computer can't connect to the sphero.
 */
orb.on('error', function () {
    console.error('Sphero encountered a problem during the connection.');
    console.info('Trying again to connect ...');
    connect();
});

/**
 * This function connect the computer to the sphero.
 */
function connect () {
    orb.connect(function () {
        console.info('Sphero successfully connected');
    });
}

/**
 * This function send the signal to roll to the sphero.
 * @param {int} velocity - The velocity of the sphero. Between 0 et 255.
 * @param {int} angle - The direction in degrees of the sphero. Between 0 et 359.
 */
function roll (velocity, angle) {
    isInCalibrationPhase = false;
    orb.roll(velocity, angle);
}

/**
 * This function send the signal to calibrate to the sphero.
 * A blue point appears in the back of the sphero.
 */
function startCalibration () {
    orb.startCalibration(function () {
        isInCalibrationPhase = true;
    });
}

/**
 * This function send the signal to finish the calibration to the sphero.
 */
function finishCalibration () {
    orb.finishCalibration();
}

// TODO delete this later.
/**
 * This function is only used in dev mode.
 * @param key
 * @param velocity
 */
function handle (key, velocity) {

    console.log('got "keypress"', key);

    if (key === "B") {
        orb.color("blue");
    }

    if (key === "R") {
        orb.color("red");
    }

    if (key === "S") {
        startCalibration();
    }

    if (key === "F") {
        finishCalibration();
    }

    if (key === "space") {
        orb.stop();
    }

    if (key === "&") {
        roll(velocity, 0);
    }

    if (key === "'") {
        roll(velocity, 90);
    }

    if (key === "(") {
        roll(velocity, 180);
    }

    if (key === "%") {
        roll(velocity, 270);
    }
}

// TODO delete this later.
/**
 * This route is used to develop mode.
 * We use it to try some things with the sphero.
 */
router.post('/key', function (req, res, next) {
    console.log(req.body.key);
    handle(req.body.key, req.body.distance);
    res.send('ok');
});

module.exports = router;