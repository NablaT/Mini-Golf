'use strict';
/**
 * Created by guillaume on 17/01/2016.
 */

var User = require('./user.js');

/**
 * This class represents a golf game.
 */
class Golf {

    /**
     * The constructor of a golf game class.
     * @param {int} playerNumber - The number of players.
     * @param {Map} map - The golf map.
     */
    constructor (playerNumber, map) {
        this._players = [];
        this._map     = map;
        for (var i = 0; i < playerNumber; i++) {
            this._players.push(new User());
        }
    }

    /**
     * Getter of the player array.
     * @returns {Array} The player array.
     */
    get players () {
        return this._players;
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