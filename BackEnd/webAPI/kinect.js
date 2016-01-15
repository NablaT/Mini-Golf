var router = require('../core/core.js').express.Router();

var lastShootDirection = "-1";

/**
 * Cette route permet de récupérer les scores.
 */
router.get('/test', function(req, res, next) {
    console.log('cc');
    res.send('ok');
});

router.post('/direction', function (req, res, next) {

    var direction = req.param('direction', null); // DROIT, GAUCHE45, GAUCHE90, -GAUCHE45, -DROIT, -DROITE45, DROITE90, DROITE45

    lastShootDirection = direction;

    //console.log("dir = ", direction);
    res.send('\nok\n');

});

var getLastShootDirection = function(){
    return lastShootDirection;
};

var resetDirection = function (){
    lastShootDirection = "-1";
};

module.exports = {router:router, getLastShootDirection:getLastShootDirection, resetDirection:resetDirection};