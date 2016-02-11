'use strict';

var Matrix   = require('./matrix.js'),
    Position = require('./position.js');

/**
 * This class represents a matrix.
 */
class Map {

    // TODO row and column params should be strictly positives.
    /**
     * The constructor of a matrix.
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
        this._ballPosition  = Position.copy(startPosition);

        this.printHole();

    }

    /**
     * Getter of the map width.
     * @returns {int} The map width.
     */
    get width () {
        return this._width;
    }

    /**
     * Getter of the map height.
     * @returns {int} The map height.
     */
    get height () {
        return this._height;
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
     * Setter of the ball position.
     * @param {Position} newPosition - The new ball position.
     */
    set ballPosition (newPosition) {
        this._ballPosition = newPosition;
    }

    /**
     * This function sets the position ball.
     * @param {number} distance - The shoot's distance.
     * @param {int} angle - The shoot's angle in degrees.
     * @param {function} callbackInHole - Callback to be triggered when the ball is in the hole.
     * @param {function} callbackOutOfMap - Callback to be triggered when the ball is out of the map.
     */
    setPositionBall (distance, angle, callbackInHole, callbackOutOfMap) {

        this.ballPosition.latitude -= parseInt(Math.sin(Map.toRadians(angle)) * distance, 10);
        this.ballPosition.longitude += parseInt(Math.cos(Map.toRadians(angle)) * distance, 10);

        this.check(callbackInHole, callbackOutOfMap);
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
     * This function checks where is the ball.
     * If the ball is in the hole a callback is triggered to inform everyone.
     * If the ball is out of the map a callback is triggered to inform everyone and the ball position is reinitialized.
     * @param {function} callbackInHole - Callback to be triggered when the ball is in the hole.
     * @param {function} callbackOutOfMap - Callback to be triggered when the ball is out of the map.
     */
    check (callbackInHole, callbackOutOfMap) {

        if (this.isInMap()) {
            console.log('The Ball is in MAP');
            if (this.isInHole()) {
                callbackInHole();
            }
        }
        else {
            console.log('OUT OF MAP START MAP');
            callbackOutOfMap();
        }

    };

    /**
     * This function aimed to check if the ball is still on the map.
     * @returns {boolean} True if the ball is on the map, else false.
     */
    isInMap () {
        return this.matrix.isInMatrix(this.ballPosition.longitude, this.ballPosition.latitude);
    };

    /**
     * This function aimed to check if the ball is in the hole.
     * @returns {boolean} True if the ball is in the hole, else false.
     */
    isInHole () {
        var latMin  = this.holePosition.latitude - (this.holeSide / 2);
        var latMax  = this.holePosition.latitude + (this.holeSide / 2);
        var longMin = this.holePosition.longitude - (this.holeSide / 2);
        var longMax = this.holePosition.longitude + (this.holeSide / 2);
        return !!(latMin <= this.ballPosition.latitude && this.ballPosition.latitude <= latMax
        && longMin <= this.ballPosition.longitude && this.ballPosition.longitude <= longMax);
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
     * This function erases the ball position on the map.
     */
    resetBall () {
        for (let i = this.ballPosition.latitude - 2; i < this.ballPosition.latitude + 2; i++) {
            for (let j = this.ballPosition.longitude - 2; j < this.ballPosition.longitude + 2; j++) {
                this.matrix.setElement(j, i, '-');
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
                this.matrix.setElement(j, i, '*');
            }
        }
    }

    /**
     * This functions prints the map.
     */
    toString () {
        this.printBall();
        this.matrix.toString();
        this.resetBall();
    }

}

module.exports = Map;