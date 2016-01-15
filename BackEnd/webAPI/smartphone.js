var router = require('../core/core.js').express.Router();

//var sphero = require('../sockets/sphero.js');

/**
 * Cette route permet de définir la map que l'on veut.
 */
router.put('/club', function(req,res){

    console.log(req.body);
    console.log(req.body.length);



    res.send('ok');
    //sphero.emit('hello', {pouet: 'pouet'});
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

router.get('/ready', function (req, res) {
   res.send(true);
});

module.exports = router;