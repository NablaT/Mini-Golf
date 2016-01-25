'use strict';

/**
 * Created by guillaume on 22/01/2016.
 */

var idGenerator = require('./id.js')();

/**
 * This class represent a player.
 */
class Player {

    /**
     * The default constructor of a Player.
     * @param {String} playerName - The player's name.
     */
    constructor (playerName) {
        this._playerName = playerName;
        this._id         = idGenerator.next().value;
        this._score      = 0;
    }

    /**
     * Getter of the player's name.
     * @returns {String}
     */
    get playerName () {
        return this._playerName;
    }

    /**
     * Getter of the id.
     * @returns {int} The player's id.
     */
    get id () {
        return this._id;
    }

    /**
     * Getter of the score.
     * @returns {int} The score.
     */
    get score () {
        return this._score;
    }

    /**
     * Setter of the score.
     * @param {int} newScore - The new player's score.
     */
    set score (newScore) {
        this._score = newScore
    }

}

module.exports = Player;