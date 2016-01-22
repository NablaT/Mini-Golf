'use strict';

/**
 * Created by guillaume on 22/01/2016.
 */

var idGenerator = require('./id.js')();

/**
 * This class represent a user.
 */
class User {

    /**
     * The default constructor of a User.
     */
    constructor () {
        this._id    = idGenerator.next().value;
        this._score = 0;
    }

    /**
     * Getter of the id.
     * @returns {int} The user's id.
     */
    get id () {
        return this._id;
    }

    /**
     * Getter of the score.
     * @returns {int} The color id.
     */
    get score () {
        return this._score;
    }

    /**
     * Setter of the score.
     * @param {int} newScore - The new user's score.
     */
    set score (newScore) {
        this._score = newScore
    }

}

module.exports = User;