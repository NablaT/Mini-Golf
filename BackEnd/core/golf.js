'use strict';
/**
 * Created by guillaume on 17/01/2016.
 */

var Player = require('./player.js');

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
        this._playerNumber = playerNumber;
        this._players      = [];
        this._map          = map;
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

    /**
     * Getter of the player number.
     * @returns {int} The player number.
     */
    get playerNumber () {
        return this._playerNumber;
    }

    /**
     * This function adds a player if there is still room in the game.
     * @param {String} playerName - The player's name.
     * @returns {int} Returns :
     * <ul>
     *     <li>True if the player could join the game and he's the last one.</li>
     *     <li>False if the player could join the game and he's not the last one.</li>
     *     <li>-1 if there is no place anymore.</li>
     * </ul>
     */
    addPlayer (playerName) {
        if (this.players.length < this.playerNumber) {
            this.players.push(new Player(playerName));
            return this.isAllPlayersJoined();
        }
        else {
            return -1;
        }
    }

    /**
     * This function returns true if all players joined the game, else false.
     * @returns {boolean} True if all players have joined the game, else false.
     */
    isAllPlayersJoined () {
        return (this.players.length === this.playerNumber);
    }
}

module.exports = Golf;