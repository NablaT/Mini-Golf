var router = require('../core/core.js').express.Router(),
    game   = require('../game/game.js');

// TODO this function seems to not be use anymore.
/**
 * This get function returns the scores.
 */
router.get('/scores', function (req, res, next) {
    res.send(game.getGolf().players);
});

/**
 * This post function updates the number of players.
 */
router.post('/nbofplayer', function (req, res, next) {
    // req.body = {numberofplayer:data}
    game.initGame(req.body.numberofplayer);
    res.send(game.getGolf().players);
});

/**
 * This get function returns true if the game is running, false either.
 */
router.get('/gameruns', function (req, res, next) {
    if (game.getGolf() === null) {
        res.send(false);
    }
    else {
        res.send(true);
    }
});

module.exports = router;