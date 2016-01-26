/**
 * Created by guillaume on 20/01/2016.
 */

var Map      = require('../core/map.js'),
    Position = require('../core/position.js'),
    Golf     = require('../core/golf.js'),
    kinect   = require('../webAPI/kinect.js'),
    sphero   = require('../sockets/sphero.js'),
    ecran    = require('../sockets/ecran.js');

const DIST_TO_VELOCITY     = 0.534;
const CENTIMETRE_TO_PIXELS = 2; // TODO fake to define

var map = new Map(1200, 800, new Position(100, 400), new Position(1100, 400));

var golf = null;

const MINIMUM_SHOOT_TIME = 1000; // 1 sec temps minimal d'un tir
const MINIMUM_NB_VALUES = 100; // minimum values getted by the accelerometer

var getGolf = function () {
    return golf;
};

/**
 * This function initiates a new game.
 * @param {int} numberPlayer - The number of players.
 */
var initGame = function (numberPlayer) {
    golf = new Golf(numberPlayer, map);
};

/**
 * This function ends a game.
 */
var endGame = function () {
    golf = null;
};

/**
 * This function adds a player to the game.
 * @param {String} playerName - The player's name.
 * @returns {int} Returns :
 * <ul>
 *     <li>True if the player could join the game and he's the last one.</li>
 *     <li>False if the player could join the game and he's not the last one.</li>
 *     <li>-1 if there is no room anymore.</li>
 *     <li>-2 if the game is not started.</li>
 * </ul>
 */
var addPlayer = function (playerName) {
    if (getGolf() === null) {
        return -2;
    }
    else {
        return getGolf().addPlayer(playerName, function () {
            ecran.emit('players', getGolf().players);
        });
    }
};

/**
 * This function finds the player who is supposed to play and executes the callback function with the player's name in
 * parameter.
 * @param {function} callback - The callback function to execute.
 */
var getPlayerToPlay = function (callback) {
    // TODO find the real player who is supposed to play.
    callback(getGolf().players[0]);
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
 * This function aimed to start the calibration of the sphero.
 */
var startCalibration = function () {
    sphero.startCalibration();
};

/**
 * This function converts the angle received from the kinect to a valid angle for the sphero.
 * @param {int} kinectAngle - The angle sent from the kinect.
 * @param {boolean} isRighty - A boolean to know if the user is righty.
 * @returns {number} A valid angle for the sphero.
 */
var convertKinectAngleToSpheroAngle = function (kinectAngle, isRighty) {
    var angle = 0; // transformation de l'angle pour la sphero
    if (isRighty) {
        angle = kinectAngle - 90; // tir à gauche pour un droitier
        if (angle < 0) {
            angle += 360;
        }
    } else {
        angle = kinectAngle + 90; // tir à droite pour un gaucher
        if (angle > 360) {
            angle -= 360;
        }
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

        if (z < zmin) {
            zmin = z;
        }
        if (z > zmax) {
            zmax = z;
        }
    }

    return zmin * clubMass; // force en Newton : F(Newton) = m(kg) * a(m.s-2)
};

/**
 * This function looks if the shoot is valid.
 * @param {Array} datas - The array of the accelerometer datas in 4 dimensions.
 * @param {number} strikeForce - The force in Newton.
 * @returns {boolean} True if the shoot is valid, false else.
 */
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
 * @returns {number} The velocity for the sphero.
 */
var distToVelocity = function (dist) {
    return dist * DIST_TO_VELOCITY;
};

/**
 * This function moves the sphero.
 * @param {number} strikeForce - The force in Newton.
 */
var go = function (strikeForce) {
    var dist = Math.abs(strikeForce) * 30; // fake calcul, result en cm
    console.log(dist);
    var velocity = distToVelocity(dist);
    console.log(velocity);
    sphero.goSphero(velocity);
    golf.players[0].score += 1;
};

module.exports = {
    getGolf             : getGolf,
    initGame            : initGame,
    endGame             : endGame,
    addPlayer           : addPlayer,
    getPlayerToPlay     : getPlayerToPlay,
    playerReady         : playerReady,
    startCalibration    : startCalibration,
    calculateStrikeForce: calculateStrikeForce,
    isValidShoot        : isValidShoot,
    distToVelocity      : distToVelocity,
    go                  : go
};
