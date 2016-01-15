/**
 * Created by Romain Guillot on 15/01/16.
 *
 * calculating displacement
 */

var calculate = function(force, isdroitier) {

    var direction = require('./webAPI/kinect.js').getLastShootDirection(); // get the last direction of the shooter

    if (direction == "-1"){
        console.log("Position not set by the kinect");
        return;
    }

    console.log("Tir : [force:" + force + "] - [direction:" + direction + "deg]");

    var dist = Math.abs(force) * 15; // fake calcul, result en cm

    var angle = 0; // transformation de l'angle pour la sphero
    if (isdroitier) {
        angle = direction-90; // tir à gauche pour un droitier
        if (angle < 0) angle+=360;
    } else {
        angle = direction +90; // tir à droite pour un gaucher
        if (angle > 360) angle-=360;
    }

    require('./sockets/sphero.js').testSphero(dist, angle); // send info to the sphero server
    require('./map.js').deplace_ball(dist, angle); // send info to the frontend

    require('./webAPI/kinect.js').resetDirection(); // reset the last direction in the kinect

};

module.exports = {calculate:calculate};
