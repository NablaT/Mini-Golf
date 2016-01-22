/**
 * Created by guillaume on 20/01/2016.
 */

var Map      = require('../core/map.js'),
    Position = require('../core/position.js'),
    Golf     = require('../core/golf.js'),
    kinect   = require('../webAPI/kinect.js'),
    sphero   = require('../sockets/sphero.js');

const DIST_TO_VELOCITY = 0.534;
var CENTIMETRE_TO_PIXELS = 2; // TODO fake to define

var map = new Map(1200, 800, new Position(100, 400), new Position(1100, 400));

var golf = null;

const MINIMUM_SHOOT_TIME = 1000; // 1 sec temps minimal d'un tir
const MINIMUM_NB_VALUES = 100; // minimum values getted by the accelerometer

/**
 * This function starts a new game.
 */
var startGame = function () {
    golf = new Golf(map);
};

/**
 * This function ends a game.
 */
var endGame = function () {
    golf = null;
};

/**
 * This function gets the direction from kinect and transmits it to sphero.
 * @returns {boolean} True if the direction exists, false either.
 */
var playerReady = function () {
    var direction = kinect.getLastShootDirection();
    if (direction !== -1) {
        sphero.ready(convertKinectAngleToSpheroAngle(direction, true));
        return true;
    }
    return false;
};

/**
 * // TODO doc
 * @param kinectAngle
 * @param isDroitier
 * @returns {number}
 */
var convertKinectAngleToSpheroAngle = function (kinectAngle, isDroitier) {
    var angle = 0; // transformation de l'angle pour la sphero
    if (isDroitier) {
        angle = kinectAngle - 90; // tir à gauche pour un droitier
        if (angle < 0) angle += 360;
    } else {
        angle = kinectAngle + 90; // tir à droite pour un gaucher
        if (angle > 360) angle -= 360;
    }
    return angle;
};

/**
 * This functions calculates the force of the user's strike with datas of the accelerometer.
 * @param {Array} datas - The array of the accelerometer datas in 4 dimensions.
 * @param {number} clubMass - The club mass in kg.
 * @returns {number} The force in Newton.
 */
var calculateStrikeForce = function (datas, clubMass) {

    var datas_size = datas.length;

    var zmin = 0, zmax = 0;
    var x, y, z, t;

    for (var i = 0; i < datas_size; i++) {

        t = datas[i].t;
        x = datas[i].x;
        y = datas[i].y;
        z = datas[i].z;

        if (z < zmin) zmin = z;
        if (z > zmax) zmax = z;
    }

    return zmin * clubMass; // force en Newton : F(Newton) = m(kg) * a(m.s-2)
};

var isValidShoot = function (datas, strikeForce) {

    var datas_size = datas.length;
    // filtrer le tir
    if (datas[datas_size - 1].t < MINIMUM_SHOOT_TIME) { // shoot time too short

        console.log("Shoot is too short");
        return false;
    }
    else if (datas_size < MINIMUM_NB_VALUES) { // not enough values

        console.log("Your accelerometer is bad");
        return alse;
    }
    else if (strikeForce === 0) {

        console.log("The movement is not good");
        return false;
    }
    console.log('Shoot valid');
    return true;
};

/**
 * Calculate the velocity for the sphero in function of the distance to parcourate
 * @param {number} dist : the distance to parcourate in centimeters
 * @returns {number} the velocity for the sphero
 */
var distToVelocity = function (dist) {
    return dist*DIST_TO_VELOCITY;
};

var go = function (strikeForce) {
    var dist = Math.abs(strikeForce) * 50; // fake calcul, result en cm
    var velocity = distToVelocity(dist);
    sphero.goSphero(velocity);
};

module.exports = {
    golf                : golf,
    startGame           : startGame,
    endGame             : endGame,
    playerReady         : playerReady,
    calculateStrikeForce: calculateStrikeForce,
    isValidShoot        : isValidShoot,
    distToVelocity      : distToVelocity
};
