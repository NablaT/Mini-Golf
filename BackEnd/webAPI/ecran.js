var router = require('../core/core.js').express.Router();

/**
 * This get function returns the scores.
 */
router.get('/scores', function(req, res, next) {
    res.send('ok');
});

/**
 * This post function updates the number of players.
 */
router.post('nbofplayer', function (req, res, next) {
    // req.body = {numberofplayer:data}
    // TODO register nbofplayer somewhere.
    res.send('ok');
});

// TODO create a boolean isGameRunning
/**
 * This get function returns true if the game is running, false either.
 */
router.get('gameruns', function (req, res, next) {
    // TODO returns a boolean if the game is running or not.
    res.send('ok');
});

/**
 * This post funciton update the boolean isGameRunning.
 */
router.post('gameruns', function (req, res, next) {
    //req.body = {}
    res.send('ok');
});

module.exports = router;