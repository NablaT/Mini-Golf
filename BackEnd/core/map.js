'use strict';

var Matrix = require('./matrix.js');

/**
 * This class represents a matrix.
 */
class Map {

    // TODO row and column params should be strictly positives.
    /**
     * The constrctor of a matrix.
     * @param {int} width - The width of the map.
     * @param {int} height - The height of the map.
     * @param {Position} startPosition - The start position.
     * @param {Position} holePosition - The hole position.
     * @param {int} holeSide - The hole side.
     * @param {int} deformationAngle - The deformation angle in degrees.
     */
    constructor (width, height, startPosition, holePosition, holeSide, deformationAngle) {
        this._width         = width;
        this._height        = height;
        this._startPosition = startPosition;
        this._holePosition  = holePosition;
        this._holeSide      = holeSide;
        this._matrix        = new Matrix(height, width, '-', deformationAngle);
        this._ballPosition  = startPosition;

        this.printHole();

    }

    /**
     * Getter of the matrix.
     * @returns {Matrix} - The matrix.
     */
    get matrix () {
        return this._matrix;
    }

    /**
     * Getter of the starter position.
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
     * Getter of the hole side.
     * @returns {int} The hole side.
     */
    get holeSide () {
        return this._holeSide;
    }

    /**
     * Getter of the ball position.
     * @returns {Position} The ball position.
     */
    get ballPosition () {
        return this._ballPosition;
    }

    /**
     * This function sets the position ball.
     * @param {number} distance - The shoot's distance.
     * @param {int} angle - The shoot's angle in degrees.
     * @param {function} callback - Callback to be triggered when the ball is in the hole.
     */
    setPositionBall (distance, angle, callback) {

        this.ballPosition.latitude += parseInt(Math.cos(Map.toRadians(angle)) * distance);
        this.ballPosition.longitude += parseInt(Math.sin(Map.toRadians(angle)) * distance);

        this.check(callback);
    }

    /**
     * This function converts an angle in degrees to an angle in radians.
     * @param {int} angle - The angle in degrees.
     * @returns {number} The angle in radians.
     */
    static toRadians (angle) {
        return angle * (Math.PI / 180);
    }

    /**
     * This function checks if the ball is in the hole.
     * @param {function} callback - Callback to be triggered when the ball is in the hole.
     */
    check (callback) {

        if ((
                (this.holePosition.latitude - (this.holeSide / 2))
                < this.ballPosition.latitude
                && (this.holeSide / 2)
                > this.holePosition.latitude
            )
            &&
            (
                (this.holePosition.longitude - (this.holeSide / 2))
                < this.ballPosition.longitude
                && (this.holeSide / 2)
                > this.holePosition.longitude
            )
        ) {
            callback();
        }
    };

    /**
     * This function prints the ball position. (Rayon of 5).
     */
    printBall () {
        for (let i = this.ballPosition.latitude - 2; i < this.ballPosition.latitude + 2; i++) {
            for (let j = this.ballPosition.longitude - 2; j < this.ballPosition.longitude + 2; j++) {
                this.matrix.setElement(j, i, '#');
            }
        }
    }

    /**
     * This function prints the hole position.
     */
    printHole () {
        for (let i = this.holePosition.latitude - (this.holeSide / 2);
             i < this.holePosition.latitude + (this.holeSide / 2);
             i++) {
            for (let j = this.holePosition.longitude - (this.holeSide / 2);
                 j < this.holePosition.longitude + (this.holeSide / 2);
                 j++) {
                this.matrix.setElement(j, i, ' ');
            }
        }
    }

    /**
     * This functions prints the map.
     */
    toString () {
        this.printBall();
        this.matrix.toString();
    }

}

module.exports = Map;