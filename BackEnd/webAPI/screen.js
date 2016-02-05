var router = require('../core/core.js').express.Router(),
    game   = require('../game/game.js');

/**
 * This post function updates the number of players.
 */
router.post('/nbofplayer', function (req, res, next) {
    // req.body = {numberofplayer:data}
    game.initGame(req.body.numberofplayer);
    res.send(game.getGolf().players);
});

module.exports = router;