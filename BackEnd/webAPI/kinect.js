var router = require('../core/core.js').express.Router();

var lastShootDirection = -1;

/**
 * This route aimed to update the player's direction received from kinect.
 */
router.post('/direction', function (req, res, next) {

    lastShootDirection = req.param('direction', null);

    res.send('\nok\n');

});

/**
 * This function aimed to get the last direction of the shoot.
 * @returns {int} The angle's direction used by the player.
 */
var getLastShootDirection = function () {
    return lastShootDirection;
};

/**
 * This function resets the direction after a shoot.
 */
var resetDirection = function () {
    lastShootDirection = -1;
};

module.exports = {
    router               : router,
    getLastShootDirection: getLastShootDirection,
    resetDirection       : resetDirection
};