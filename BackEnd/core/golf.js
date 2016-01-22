'use strict';
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
     * @param {Map} map - The golf map.
     */
    constructor (map) {
        this._playerNumber = 0;
        this._map          = map;
    }

    /**
     * Getter of the player number.
     * @returns {int} The number of players.
     */
    get playerNumber () {
        return this._playerNumber;
    }

    /**
     * Setter of the player number.
     * @param {int} newPlayerNumber - The new number of player.
     */
    set playerNumber (newPlayerNumber) {
        this._playerNumber = newPlayerNumber;
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