'use strict';

/**
 * Created by guillaume on 15/01/2016.
 */

/**
 * This class represents a matrix.
 */
class Matrix {

    // TODO row and column params should be strictly positives.
    /**
     * The constrctor of a matrix.
     * @param {int} row - The row number of the matrix.
     * @param {int} column - The column number of the matrix.
     * @param {*} value - The default value for every element in the matrix.
     */
    constructor (row, column, value) {
        this._row    = row;
        this._column = column;
        if (value === undefined) {
            value = 0;
        }
        this._matrix = new Array(row);
        for (var i = 0, length = this._matrix.length; i < length; i++) {
            this._matrix[i] = new Array(column);
            for (var j = 0, length2 = this._matrix[i].length; j < length2; j++) {
                this._matrix[i][j] = value;
            }
        }
    }

    /**
     * Getter of the row number of the matrix.
     * @returns {int} The row number.
     */
    get row () {
        return this._row;
    }

    /**
     * Getter of the column number of the matrix.
     * @returns {int} The column number.
     */
    get column () {
        return this._column;
    }

    /**
     * Getter of the matrix.
     * @returns {Array} The matrix.
     */
    get matrix () {
        return this._matrix;
    }

    /**
     * Getter of an element of the matrix.
     * If the element that we try to access is out of range, it returns undefined.
     * @param {int} rowNumber - The row number of the element.
     * @param {int} columnNumber - The column number of the element.
     * @returns {*} Returns an element.
     */
    getElement (rowNumber, columnNumber) {
        if (rowNumber >= this.row || columnNumber >= this.column) {
            return;
        }
        return this.matrix[rowNumber][columnNumber];
    }

    /**
     * Setter of an element of the matrix.
     * If the element that we try to update is out of range, it returns an error.
     * @param {int} rowNumber - The row number of the element.
     * @param {int} columnNumber - The column number of the element.
     * @param {*} newValue - The new value of the element.
     */
    setElement (rowNumber, columnNumber, newValue) {
        if (rowNumber >= this.row || columnNumber >= this.column) {
            // TODO should throw an error
            console.error('out of range');
        }
        else {
            this.matrix[rowNumber][columnNumber] = newValue;
        }
    }

}

module.exports = Matrix;