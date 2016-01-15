var router = require('../core/core.js').express.Router();

var calculation = require('../golf_calculation.js');

/**
 * Cette route permet de récupérer et d'analyser le mouvement du tireur
 */
router.put('/club', function(req,res){

    var CLUB_MASS = 0.460; // 460 grammes
    var MINIMUM_SHOOT_TIME = 1000; // 1 sec temps minimal d'un tir
    var MINIMUM_NB_VALUES = 100; // minimum values getted by the accelerometer
    var IS_DROITIER = true;

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

    // filtrer le tir
    if (datas[data_size-1].t < MINIMUM_SHOOT_TIME){ // shoot time too short

        console.log("Shoot is too short");
        valid = false;
    }
    else if (data_size < MINIMUM_NB_VALUES){ // not enough values

        console.log("Your accelerometer is bad");
        valid = false;
    }
    else if (strike_force==0){

        console.log("The movement is not good");
        valid = false;
    } else {

        console.log("Shoot is valid");
    }

    result.valid = valid;
    result.strike_force = Math.abs(strike_force);

    res.contentType('application/json');

    var response = JSON.stringify(result);

    res.send(response); // send response to mobile app

    if (valid){
        // calculate with the server
        calculation.calculate(strike_force, IS_DROITIER);
    }

});

router.get('/ready', function (req, res) {
   res.send(true);
});

module.exports = router;