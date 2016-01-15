var router = require('../core/core.js').express.Router();

/**
 * Cette route permet de récupérer les scores.
 */
router.get('/test', function(req, res, next) {
    console.log('cc');
    res.send('ok');
});

router.post('/direction', function (req, res, next) {
    var direction = req.param('direction', null);
    console.log("dir = ", direction);
    res.send('Hello World!');
});

module.exports = router;