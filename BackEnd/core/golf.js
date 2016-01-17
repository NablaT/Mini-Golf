/**
 * Created by guillaume on 17/01/2016.
 */

var Map = require('./map.js');

/**
 * This class represents a golf game.
 */
class Golf {

    /**
     * The constructor of a golf game class.
     * @param {int} playerNumber - The number of players for the game. Must be a positive number.
     */
    constructor (playerNumber) {
        this._playerNumber = playerNumber;
        this._map          = new Map();
    }

    /**
     * Getter of the player number.
     * @returns {int} The number of players.
     */
    get playerNumber () {
        return this._playerNumber;
    }

    /**
     * Getter of the map.
     * @returns {Map} The map of the golf game.
     */
    get map () {
        return this._map;
    }
}

module.exports = Golf;