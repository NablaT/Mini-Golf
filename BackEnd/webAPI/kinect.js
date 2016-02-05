var router = require('../core/core.js').express.Router(),
    kinect = require('../game/kinect.js'),
    screen   = require('../sockets/screen.js');

/**
 * This route aimed to update the player's direction received from kinect.
 */
router.post('/direction', function (req, res, next) {

    var direction = req.query['direction'];

    kinect.shootDirection = direction;
    screen.emit('direction', {direction : direction});

    res.send('\nok\n');

});

module.exports = router;