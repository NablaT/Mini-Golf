var router = require('../core/core.js').express.Router();

var game = require('../game/game.js');
var sphero = require('../sockets/sphero.js');

// TODO DELETE this function
/**
 * Cette route permet de récupérer et d'analyser le mouvement du tireur
 */
router.put('/go', function (req, res) {

    var CLUB_MASS = 0.460; // 460 grammes

    var datas = req.body;

    var strike_force = game.calculateStrikeForce(datas, CLUB_MASS);

    console.log('force de frappe ' + strike_force + 'N');


    var result          = {};
    result.valid        = game.isValidShoot(datas, strike_force);
    result.strike_force = Math.abs(strike_force);

    res.contentType('application/json');

    var response = JSON.stringify(result);

    res.send(response); // send response to mobile app

    if (result.valid) {
        // calculate with the server
        game.go(result.strike_force);
    }

});

/**
 * This route prepares the sphero to roll.
 */
router.put('/ready', function (req, res) {
    if (game.playerReady()) {
        res.send('ok');
    } else {
        res.send('bad');
    }
});

/**
 * This route lauch the calibration of the sphero
 */
router.put('/startcalibration', function (req, res) {
    sphero.startCalibration();
    res.send('ok');
});

/**
 * This route stop the calibration of the sphero
 */
router.put('/stopcalibration', function (req, res) {
    sphero.finishCalibration();
    res.send('ok');
});

module.exports = router;