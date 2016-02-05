var router = require('../core/core.js').express.Router(),
    kinect = require('../game/kinect.js');

/**
 * This route aimed to update the player's direction received from kinect.
 */
router.post('/direction', function (req, res, next) {

    kinect.shootDirection = req.query['direction'];

    res.send('\nok\n');

});

module.exports = router;