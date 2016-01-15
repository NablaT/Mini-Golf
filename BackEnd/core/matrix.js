'use strict';

/**
 * Created by guillaume on 15/01/2016.
 */

class Matrix {

    /**
     * This class represents a matrix.
     * @param {int} row - The row number of the matrix.
     * @param {int} column - The column number of the matrix.
     */
    constructor (row, column) {
        this._row = row;
        this._column = column;
        this._matrix = new Array(row);
        for (var i= 0, length = this.matrix.length; i < length; i++){
            this.matrix.push(new Array(column));
        }
    }

    /**
     * Getter of the row number of the matrix.
     * @returns {int} The row number.
     */
    get row (){
        return this._row;
    }

    /**
     * Getter of the column number of the matrix.
     * @returns {int} The column number.
     */
    get column () {
        return this._column;
    }

    get matrix () {
        return this._matrix;
    }

}

module.exports = Matrix;