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
     */
    constructor (width, height) {
        this._matrix = new Matrix(height, width);
    }

    get matrix () {
        return this._matrix;
    }

    // TODO Define this method
    createObstacles () {

    }

}

module.exports = Map;