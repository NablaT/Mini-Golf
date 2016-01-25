/////////////////////////////////                       Base                           /////////////////////////////////
var logger     = require('morgan'),
    bodyParser = require('body-parser');

/////////////////////////////////                       Core                           /////////////////////////////////
var http = require('./core/core.js').getHttp(),
    app  = require('./core/core.js').app;

/////////////////////////////////                 Routers inclusion                    /////////////////////////////////

var ecranRouter      = require('./webAPI/ecran.js'),
    smartphoneRouter = require('./webAPI/smartphone.js'),
    kinectRouter     = require('./webAPI/kinect.js').router;

/////////////////////////////////                      Sphero                          /////////////////////////////////
require('./sockets/sphero.js');

/////////////////////////////////                 Logger and parsing                   /////////////////////////////////
app.use(logger('dev')); // Logger in dev mode.
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({extended: false})); // For parsing application/x-www-form-urlencoded

/**
 * HTTP header definitions.
 */
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Définit qui a le droit d'appeler le serveur.
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS"); // Définit les méthodes qu'on a le droit d'utiliser.
    next();
});

/////////////////////////////////                      Routers                         /////////////////////////////////
app.use('/ecran', ecranRouter);
app.use('/smartphone', smartphoneRouter);
app.use('/kinect', kinectRouter);


// crée la map
//require('./map.js')
//    .create();

var MapDeform = require('./core/mapDeform.js');

var m = new MapDeform();

//m.toString();

if(m.setPositionBall(231,0)){
    console.log("YOU WIN !");
    console.log("X ball = ",m.getXball());
    console.log("Y ball = ",m.getYball());
}else{
   // m.toString();
    console.log("NOP !");
    console.log("X ball = ",m.getXball());
    console.log("Y ball = ",m.getYball());

}if(m.setPositionBall(131,90)){
    console.log("YOU WIN !");
    console.log("X ball = ",m.getXball());
    console.log("Y ball = ",m.getYball());
}else{
   // m.toString();
    console.log("NOP !");
    console.log("X ball = ",m.getXball());
    console.log("Y ball = ",m.getYball());

}





/*if(m.setPositionBall(2,1)){
    console.log("YOU WIN !");
}else{
    m.toString();
    console.log("NOP !");
}*/

/**
 * Server on port 3000.
 */
http.listen(3000, function () {

    console.log('Backend Mini Golf started and ready ...');

});
