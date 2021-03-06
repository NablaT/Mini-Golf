'use strict';

/**
 * Created by guillaume on 20/01/2016.
 */

var Map      = require('../core/map.js'),
    Position = require('../core/position.js'),
    Golf     = require('../core/golf.js'),
    kinect   = require('../game/kinect.js'),
    sphero   = require('../sockets/sphero.js'),
    screen   = require('../sockets/screen.js'),
    Player   = require('../core/player.js');

/////////////////////////////////                     CONSTANTS                        /////////////////////////////////

const DIST_TO_VELOCITY   = 0.534;
const MINIMUM_SHOOT_TIME = 1000; // 1 sec minimal time for a shoot
const MINIMUM_NB_VALUES = 100; // minimum values getted by the accelerometer


/**
 * The golf game variable.
 * @type {Golf}
 */
var golf = null;

/**
 * Getter of the golf variable.
 * @returns {Golf} The golf variable.
 */
var getGolf = function () {
    return golf;
};

/**
 * This function initiates a new game.
 * @param {int} numberPlayer - The number of players.
 */
var initGame = function (numberPlayer) {
    // HDMI
    golf = new Golf(numberPlayer, new Map(269, 226, new Position(36, 31), new Position(209, 206), 40, 10));
    getGolf().map.toString();
    screen.emit('waitingForPlayers', {});
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
            screen.emit('players', getGolf().players);
        });
    }
};

/**
 * This function finds the player supposed to play and places the attribute _activePlayer in it.
 * It also emits the 'players' event to the screen.
 * @returns {Player} The player supposed to play.
 */
var getPlayerToPlay = function () {
    var players = [];
    for (let i = 0; i < getGolf().players.length; i++) {
        players.push(Player.copy(getGolf().players[i]));
    }
    players[getGolf().rankPlayerToPlay]._activePlayer = true;
    screen.emit('players', players);
    return getGolf().getPlayerToPlay();
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
 * This function aimed to emit the 'gameStart' event.
 */
var screenGameStart = function () {
    screen.emit('gameStart', {});
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
        return false;
    }
    else if (strikeForce === 0) {

        console.log("The movement is not good");
        return false;
    }

    else if (timeBetween2times(datas) < 200) {
        console.log('The movement is too fast');
        return false;
    }

    console.log('Shoot valid');
    return true;
};

/**
 * This function calculates the time between the time when we have load th shoot and the time when we shoot.
 * @param {Array} datas - The array of the accelerometer datas in 4 dimensions.
 */
var timeBetween2times = function (datas) {
    var t0 = 0; // temps au début du tir
    var t1; // temps lorsqu'on a chargé le tir
    var t2; // temps au moment du tir
    var zmin = 0; // acceleration à t2
    var t, z;
    var t2index;

    var datas_size = datas.length;
    for (let i = 0; i < datas_size; i++) {
        t = datas[i].t;
        z = datas[i].z;
        if (z < zmin) {
            zmin    = z;
            t2      = t;
            t2index = i;
        }
    }

    // on parcourt les datas à partir de t2 vers t0 pour trouver t1
    // t1 est le premier point où z est positif
    for (let i = t2index; i > t0; i--) {
        z = datas[i].z;
        t = datas[i].t;
        if (z > 0) {
            t1 = t;
            break;
        }
    }

    console.log('t1 = ' + t1);
    console.log('t2 = ' + t2);
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
 * @param {function} callbackChangeOfPlayer - The function to be triggered when the player wins a game. Needs a
 *     playerName in parameter.
 * @param {function} callbackEndOfGame - The function to be triggered when a game is finished.
 * @param {function} callbackOutOfMap - The function to be triggered when the ball is out of the map.
 */
var go = function (strikeForce, callbackChangeOfPlayer, callbackEndOfGame, callbackOutOfMap) {
    var dist = Math.abs(strikeForce) * 30; // fake calcul, result in cm

    // TODO improve this shit
    var callback = function (dist) {
        console.log(dist);
        getGolf().map.setPositionBall(dist, kinect.shootDirectionReady,
            /**
             * This callback is triggered when the ball is in the hole.
             */
            function () {
                getGolf().map.ballPosition = Position.copy(getGolf().map.startPosition);
                getGolf().updatePlayerToPlay(
                    function () {
                        screen.emit('endGame', {});
                        callbackEndOfGame();
                        endGame();
                    }, function () {
                        getPlayerToPlay();
                        callbackChangeOfPlayer(getGolf().getPlayerToPlay().playerName);
                    });

            },
            /**
             * This callback is triggered when the ball is out of the map.
             */
            function () {
                getGolf().map.ballPosition = Position.copy(getGolf().map.startPosition);
                screen.emit('outOfMap', {});
                // This timeout is to handle the change view in smartphone !
                setTimeout(function () {
                    callbackOutOfMap();
                }, 2000);

            });
    };
    sphero.goSphero(distToVelocity(dist));

    // This timeout is to handle the fact that the new position of the sphero is sent 5 secondes later.
    setTimeout(function () {
        callback(sphero.getDist());
    }, 4500);

    getPlayerToPlay().score += 1; // TODO Improve this 2 lines
    getPlayerToPlay();

    // TODO DELETE the next line when it will be working.
    // This timeout is to handle the fact that there are timeout for the rest.
    setTimeout(function () {
        getGolf().map.toString()
    }, 5000);
};

module.exports = {
    getGolf             : getGolf,
    initGame            : initGame,
    endGame             : endGame,
    addPlayer           : addPlayer,
    getPlayerToPlay     : getPlayerToPlay,
    playerReady         : playerReady,
    screenGameStart     : screenGameStart,
    startCalibration    : startCalibration,
    stopCalibration     : stopCalibration,
    calculateStrikeForce: calculateStrikeForce,
    isValidShoot        : isValidShoot,
    distToVelocity      : distToVelocity,
    go                  : go
};
