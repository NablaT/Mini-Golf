var router = require('../core/core.js').express.Router(),
    golf   = require('../game/game.js');

/**
 * This get function returns the scores.
 */
router.get('/scores', function (req, res, next) {
    res.send(golf.getGolf().players);
});

/**
 * This post function updates the number of players.
 */
router.post('/nbofplayer', function (req, res, next) {
    // req.body = {numberofplayer:data}
    golf.startGame(req.body.numberofplayer);
    res.send(golf.getGolf().players);
});

/**
 * This get function returns true if the game is running, false either.
 */
router.get('/gameruns', function (req, res, next) {
    if (golf.getGolf() === null) {
        res.send(false);
    }
    else {
        res.send(true);
    }
});

module.exports = router;