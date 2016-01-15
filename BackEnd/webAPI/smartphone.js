var router = require('../core/core.js').express.Router();

var sphero = require('../sockets/sphero.js');

/**
 * Cette route permet de récupérer et d'analyser le mouvement du tireur
 */
router.put('/club', function(req,res){

    var CLUB_MASS = 0.460; // 460 grammes

    var datas = req.body;
    var data_size = req.body.length;
    var result = {};
    var valid = true;

    var zmin = 0, zmax = 0;
    var x, y, z, t;

    for (var i=0; i<data_size; i++){


        t = datas[i].t;
        x = datas[i].x;
        y = datas[i].y;
        z = datas[i].z;

        if (z<zmin) zmin = z;
        if (z>zmax) zmax = z;
    }

    var strike_force = zmin * CLUB_MASS; // force en Newton : F(Newton) = m(kg) * a(m.s-2)

    console.log('force de frappe ' + strike_force + 'N');

    if (strike_force==0) valid = false; // bad shoot

    result.valid = valid;
    result.strike_force = Math.abs(strike_force);

    res.contentType('application/json');
    var response = JSON.stringify(result);

    res.send(response);

});

router.get('/ready', function (req, res) {
   res.send(true);
});

module.exports = router;