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

socket.on('test', function (params) {
    test(params.dist, params.angle);
});
/**
 * Permet de se connecter à la sphero.
 */
socket.on('connectSphero', function (params) {
    orb.connect(function () {

    });
});

function test (dist, angle){
    orb.roll(dist, angle);
}

function handle(key, distance) {

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
router.post('/key', function(req, res, next) {
    console.log(req.body.key);
    handle(req.body.key, req.body.distance);
    res.send('ok');
});

module.exports = router;