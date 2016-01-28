'use strict';

/**
 * Created by guillaume on 15/01/2016.
 */

/**
 * This class represents a special matrix.
 */
class Matrix {

    // TODO row and column params should be strictly positives.
    /**
     * The constructor of a matrix.
     * @param {int} row - The row number of the matrix.
     * @param {int} column - The column number of the matrix.
     * @param {*} value - The default value for every element in the matrix.
     * @param {int} deformationAngle - The deformation angle in degrees.
     */
    constructor (row, column, value, deformationAngle) {
        this._row    = row;
        this._column = column;
        this._matrix = new Array(row);

        for (let i = 0, length = this._matrix.length; i < length; i++) {
            this._matrix[i] = new Array(column);
            for (let j = 0, length2 = this._matrix[i].length; j < length2; j++) {
                let dist = Math.tan(Matrix.toRadians(deformationAngle)) * i;
                if (dist > j) {
                    this._matrix[i][j] = " ";
                }
                else if ((this._column - dist) < j) {
                    this._matrix[i][j] = " ";
                } else {
                    this._matrix[i][j] = value;
                }
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
        if (rowNumber >= this.row || rowNumber < 0 || columnNumber >= this.column || columnNumber < 0) {
            // TODO should throw an error
            console.error('out of range');
        }
        else {
            this.matrix[rowNumber][columnNumber] = newValue;
        }
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
     * This function prints the matrix.
     */
    toString () {
        var string = '';
        for (let i = 0; i < this.row; i++) {
            string += i +"{ ";
            for (let j = 0; j < this.column; j++) {
                string += this.getElement(i,j);
            }
            string += "}\n";
        }
        console.log(string);
    }

}

module.exports = Matrix;