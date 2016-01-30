/**
 * Created by guillaume on 20/01/2016.
 */

var Map      = require('../core/map.js'),
    Position = require('../core/position.js'),
    Golf     = require('../core/golf.js'),
    kinect   = require('../game/kinect.js'),
    sphero   = require('../sockets/sphero.js'),
    ecran    = require('../sockets/ecran.js');

/////////////////////////////////                     CONSTANTS                        /////////////////////////////////

const DIST_TO_VELOCITY   = 0.534;
const MINIMUM_SHOOT_TIME = 1000; // 1 sec temps minimal d'un tir
const MINIMUM_NB_VALUES = 100; // minimum values getted by the accelerometer


/**
 * The golf game variable.
 * @type {Golf}
 */
var golf               = null,
    /**
     * The indice of the player who is supposed to play.
     * @type {int}
     */
    playerToPlayIndice = -1;

var getGolf = function () {
    return golf;
};

var getPlayerToPlayIndice = function () {
    return playerToPlayIndice;
};

/**
 * This function initiates a new game.
 * @param {int} numberPlayer - The number of players.
 */
var initGame = function (numberPlayer) {
    golf               = new Golf(numberPlayer, new Map(270, 226, new Position(53, 203), new Position(230, 82), 10, 10));
    playerToPlayIndice = -1;
    ecran.emit('waitingForPlayers', {});
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
 *     <li>-3 if a player with the playerName param already exists.</li>
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
 */
var getPlayerToPlay = function () {
    // TODO find the real player who is supposed to play.
    if (getPlayerToPlayIndice() === -1) {
        playerToPlayIndice = 0;
    }
    else {
        // TODO handle the case where the indice is equal to the length of players. Cannot be superior !
        playerToPlayIndice = getPlayerToPlayIndice() + 1;
    }
    getGolf().players[playerToPlayIndice]._activePlayer = true;
    var playerName                                      = getGolf().players[playerToPlayIndice].playerName;
    ecran.emit('players', getGolf().players);
    return playerName;
};

/**
 * This function gets the direction from kinect and transmits it to sphero.
 * @returns {boolean} True if the direction is correct, else false.
 */
var playerReady = function () {
    return kinect.playerReady(true, function (angle) {
        sphero.ready(angle);
    });
};

/**
 * This function aimed to start the calibration of the sphero.
 */
var startCalibration = function () {
    sphero.startCalibration();
};

/**
 * This function aimed to stop the calibration of the sphero.
 */
var stopCalibration = function () {
    sphero.stopCalibration();
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
 * @param {function} callback - The function to be triggered when the player wins a game. Needs a playerName in parameter.
 */
var go = function (strikeForce, callback) {
    var dist = Math.abs(strikeForce) * 30; // fake calcul, result in cm
    var velocity = distToVelocity(dist);
    sphero.goSphero(velocity);

    getGolf().map.setPositionBall(dist, kinect.shootDirectionReady, function () {
        ecran.emit('victory', {});
        callback(getGolf().getPlayerToPlay());
    });
    // TODO DELETE the next line when it will be working.
    getGolf().map.toString();
    golf.players[playerToPlayIndice].score += 1;
    getGolf().players[playerToPlayIndice]._activePlayer = true;
    ecran.emit('players', getGolf().players);
};

module.exports = {
    getGolf             : getGolf,
    initGame            : initGame,
    endGame             : endGame,
    addPlayer           : addPlayer,
    getPlayerToPlay     : getPlayerToPlay,
    playerReady         : playerReady,
    startCalibration    : startCalibration,
    stopCalibration     : stopCalibration,
    calculateStrikeForce: calculateStrikeForce,
    isValidShoot        : isValidShoot,
    distToVelocity      : distToVelocity,
    go                  : go
};
