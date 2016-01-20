/**
 * Created by guillaume on 17/01/2016.
 */

var Matrix = require('./matrix.js');

/**
 * This class represents a golf Map.
 */
class Map {

    /**
     * The constructor of a map.
     * It creates a matrix with a value equal at 0 everywhere.
     * @param {int} width - The width of the map.
     * @param {int} height - The height of the map.
     * @param {Position} startPosition - The start position.
     * @param {Position} holePosition - The hole position.
     * @param {int} rayonHole - The rayon hole.
     */
    constructor (width, height, startPosition, holePosition, rayonHole = 50) {
        this._matrix        = new Matrix(height, width);
        this._startPosition = startPosition;
        this._holePosition  = holePosition;
        this._rayonHole     = rayonHole;
        this._ballPosition  = startPosition;
    }

    /**
     * Getter of the matrix.
     * @returns {Matrix} - The matrix.
     */
    get matrix () {
        return this._matrix;
    }

    /**
     * Getter of ther starter position.
     * @returns {Position} The starter position.
     */
    get startPosition () {
        return this._startPosition;
    }

    /**
     * Getter of the hole position.
     * @returns {Position} The hole position.
     */
    get holePosition () {
        return this._holePosition;
    }

    /**
     * Getter of the rayon hole.
     * @returns {int} The rayon hole.
     */
    get rayonHole () {
        return this._rayonHole;
    }

    /**
     * Getter of the ball position.
     * @returns {Position} The ball position.
     */
    get ballPosition () {
        return this._ballPosition;
    }

    /**
     * Setter of the ball position.
     * @param {Position} newBallPosition - The new ball position.
     */
    set ballPosition (newBallPosition) {
        this._ballPosition = newBallPosition;
    }

    // TODO Define this method
    createObstacles () {

    }

}

module.exports = Map;