/**
 * Created by guillaume on 20/01/2016.
 */

var Map      = require('../core/map.js'),
    Position = require('../core/position.js'),
    Golf     = require('../core/golf.js');

var CENTIMETRE_TO_PIXELS = 2; // TODO fake to define

var map = new Map(1200, 800, new Position(100, 400), new Position(1100, 400));

var golf = null;

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

module.exports = {
    golf     : golf,
    startGame: startGame,
    endGame  : endGame
};
