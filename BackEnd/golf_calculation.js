/**
 * Created by Romain Guillot on 15/01/16.
 *
 * calculating displacement
 */

var calculate = function(force) {

    var dist = Math.abs(force) * 50; // fake calcul, result en cm

    console.log("Tir : [force:" + force + "]");


    require('./sockets/sphero.js').goSphero(dist); // send info to the sphero server
    require('./map.js').deplace_ball(dist, angle); // send info to the frontend

    require('./webAPI/kinect.js').resetDirection(); // reset the last direction in the kinect

};

module.exports = {calculate:calculate};
