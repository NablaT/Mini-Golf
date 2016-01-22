var router    = require('../core/core.js').express.Router(),
    golf      = require('../game/game.js').golf,
    startGame = require('../game/game.js').startGame,
    endGame   = require('../game/game.js').endGame;

/**
 * This get function returns the scores.
 */
router.get('/scores', function (req, res, next) {
    res.send('ok');
});

/**
 * This post function updates the number of players.
 */
router.post('nbofplayer', function (req, res, next) {
    // req.body = {numberofplayer:data}
    golf.playerNumber = req.body.numberofplayer;
    res.send('ok');
});

/**
 * This get function returns true if the game is running, false either.
 */
router.get('gameruns', function (req, res, next) {
    if (golf === null) {
        res.send(false);
    }
    else {
        res.send(true);
    }
});

/**
 * This post funciton start the game or end the game.
 */
router.post('gameruns', function (req, res, next) {
    //req.body = {}
    if (golf === null) {
        startGame();
    }
    else {
        endGame();
    }
    res.sendStatus(200);
});

module.exports = router;