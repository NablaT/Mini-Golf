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
        this._playerNumber     = playerNumber;
        this._players          = [];
        this._map              = map;
        this._rankPlayerToPlay = 0;
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
     * Getter of the rank of the player supposed to play.
     * @returns {number} The rank of the player.
     */
    get rankPlayerToPlay () {
        return this._rankPlayerToPlay;
    }

    /**
     * Setter of the rank of the player supposed to play.
     * @param {number} newRank - The new rank of the player.
     */
    set rankPlayerToPlay (newRank) {
        this._rankPlayerToPlay = newRank;
    }

    /**
     * This function adds a player if there is still room in the game.
     * @param {String} playerName - The player's name.
     * @param {Function} callback - Callback's function to be triggered when a player has been added.
     * @returns {int} Returns :
     * <ul>
     *     <li>True if the player could join the game and he's the last one.</li>
     *     <li>False if the player could join the game and he's not the last one.</li>
     *     <li>-1 if there is no place anymore.</li>
     *     <li>-3 if a player with the playerName param already exists.</li>
     * </ul>
     */
    addPlayer (playerName, callback) {
        if (this.players.length < this.playerNumber) {
            if (!this.isContaining(playerName)) {
                this.players.push(new Player(playerName));
                callback();
                return this.isAllPlayersJoined();
            }
            return -3;
        }
        else {
            return -1;
        }
    }

    /**
     * This function aimed to look if a player with the playerName param already exists.
     * @param {string} playerName - The player's name.
     * @returns {boolean} True if the player already exists, else false.
     */
    isContaining (playerName) {
        for (let i = 0, length = this.players.length; i < length; i++) {
            if (this.players[i].playerName === playerName) {
                return true;
            }
        }
        return false;
    }

    /**
     * This function returns true if all players joined the game, else false.
     * @returns {boolean} True if all players have joined the game, else false.
     */
    isAllPlayersJoined () {
        return (this.players.length === this.playerNumber);
    }

    /**
     * This function returns the player supposed to play.
     * @returns {Player} The player supposed to play.
     */
    getPlayerToPlay () {
        return this.players[this.rankPlayerToPlay];
    }

    /**
     * This function updates the player supposed to play.
     * @param {function} callbackEndOfGame - Callback to be triggered when the game is finished.
     * @param {function} callbackChangeOfPlayer - The function to be triggered when the player wins a game. Needs a playerName in parameter.
     */
    updatePlayerToPlay (callbackEndOfGame, callbackChangeOfPlayer) {
        this.rankPlayerToPlay++;
        if (this.rankPlayerToPlay === this.players.length) {
            // This timeout is to handle the change view in smartphone !
            setTimeout(function () {
                callbackEndOfGame();
            }, 2000);
        }
        else {
            // This timeout is to handle the change view in smartphone !
            setTimeout(function () {
                callbackChangeOfPlayer();
            }, 2000);
        }
    }
}

module.exports = Golf;