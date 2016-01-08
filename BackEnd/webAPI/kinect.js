var router = require('../core/core.js').express.Router();

/**
 * Cette route permet de récupérer les scores.
 */
router.get('/test', function(req, res, next) {
    console.log('cc');
    res.send('ok');
});

module.exports = router;