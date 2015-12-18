var router = require('../core/core.js').express.Router();

/**
 * Cette route permet de récupérer les scores.
 */
router.get('/scores', function(req, res, next) {
    console.log('cc');
    res.send('ok');
});

/**
 * Cette route permet de définir la map que l'on veut.
 */
router.post('/map', function(req,res){
    console.log('ccc');
    res.send('ok');
    /*console.log(req.body);
    var success = function () {
        var finalObject = 'success';
        console.log(finalObject);
        res.send(finalObject);
    };

    var fail = function(){
        res.sendStatus(500);
    };

    // Grab data from http request
    var data = req.body;

    database.shopsChosen(data, success, fail);*/
});

module.exports = router;