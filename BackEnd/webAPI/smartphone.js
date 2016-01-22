var router = require('../core/core.js').express.Router();

var calculation = require('../golf_calculation.js'),
    game        = require('../game/game.js');

/**
 * Cette route permet de récupérer et d'analyser le mouvement du tireur
 */
router.put('/go', function (req, res) {

    var CLUB_MASS = 0.460; // 460 grammes

    var datas     = req.body;

    var strike_force = game.calculateStrikeForce(datas, CLUB_MASS);

    console.log('force de frappe ' + strike_force + 'N');


    var result    = {};
    result.valid        = game.isValidShoot(datas,strike_force);
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
router.get('/ready', function (req, res) {
    if (game.playerReady()) {
        res.send('ok');
    } else {
        res.send('bad');
    }
});

module.exports = router;