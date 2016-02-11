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

/**
 * A variable to know the direction of the Sphero.
 * @type {int}
 */
var angle;

/**
 * A variable to know the x position of the Sphero.
 * @type {int}
 */
var x;

/**
 * A variable to know the y position of the Sphero.
 * @type {int}
 */
var y;

/////////////////////////////////               Event listener Socket                  /////////////////////////////////

/**
 * Event listener.
 * This event aims to start the calibration of the sphero.
 */
socket.on('startCalibration', function (params) {
    startCalibration();
});

/**
 * Event listener.
 * This event aims to finish the calibration of the sphero.
 */
socket.on('stopCalibration', function (params) {
    stopCalibration(configureLocator);
});

/**
 * Event listener.
 * This event aims to orients the sphero.
 */
socket.on('ready', function (params) {
    roll(0, params.angle);
    angle = params.angle;
});

/**
 * Event listener.
 * This event aims to roll the sphero.
 */
socket.on('go', function (params) {
    roll(params.velocity, angle);
});

/**
 * Event listener.
 * This event aims to connect the computer to the sphero. (Mac user).
 */
socket.on('connectSphero', function (params) {
    connect();
});

/////////////////////////////////                    API Sphero                        /////////////////////////////////

/**
 * This function connect the computer to the sphero.
 */
function connect () {
    orb.connect(function () {
        console.info('Sphero successfully connected');
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
}

/**
 * This function aimed to initialize the location for the Sphero.
 * It means that when this function is called,
 * the position of the sphero is set to (0,0)
 * and the positive y-axis corresponds to heading 0 for the Sphero (forward).
 */
function configureLocator () {
    orb.configureLocator({
        flags  : 0x01,
        x      : 0x0000,
        y      : 0x0000,
        yawTare: 0x0
    }, function () {
        x = 0;
        y = 0;
    })
}

/**
 * This function aimed to read the location of the sphero.
 */
function readLocator () {
    orb.readLocator(function (err, data) {
        if (err) {
            console.error("error: ", err);
        } else {
            var dist = Math.sqrt(Math.pow((data.xpos - x), 2) + Math.pow((data.ypos - y), 2));
            x        = data.xpos;
            y        = data.ypos;
            socket.emit('newDistanceSphero', {dist: dist});
        }
    });
}

/**
 * This function send the signal to roll to the sphero.
 * @param {int} velocity - The velocity of the sphero. Between 0 et 255.
 * @param {int} angle - The direction in degrees of the sphero. Between 0 et 359.
 */
function roll (velocity, angle) {
    if (isInCalibrationPhase) {
        stopCalibration(configureLocator);
    }
    if (velocity > 255) {
        velocity = 255;
    }
    orb.roll(velocity, angle, undefined, setTimeout(readLocator, 7000));
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
function stopCalibration (callback) {
    orb.finishCalibration(function () {
        isInCalibrationPhase = false;
        callback();
    });
}

/////////////////////////////////           TODO DELETE THIS PART LATER                /////////////////////////////////
/////////////////////////////////                      DEV PART                        /////////////////////////////////

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
        stopCalibration(configureLocator);
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
    handle(req.body.key, req.body.velocity);
    res.send('ok');
});

module.exports = router;