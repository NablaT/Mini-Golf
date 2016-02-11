var router = require('../core/core.js').express.Router(),
    kinect = require('../game/kinect.js'),
    screen = require('../sockets/screen.js');

/**
 * This route aimed to update the player's direction received from kinect.
 */
router.post('/direction', function (req, res, next) {

    var direction = req.query['direction'];

    kinect.shootDirection = direction;
    screen.emit('direction', {direction: toRadians(direction)});

    res.send('\nok\n');

});

/**
 * This function converts an angle in degrees to an angle in radians.
 * @param {int} angle - The angle in degrees.
 * @returns {number} The angle in radians.
 */
var toRadians = function (angle) {
    return angle * (Math.PI / 180);
};

module.exports = router;