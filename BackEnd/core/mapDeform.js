'use strict';


/**
 * This class represents a matrix.
 */
class MapDeform {

    // TODO row and column params should be strictly positives.
    /**
     * The constrctor of a matrix.
     * @param {int} row - The row number of the matrix.
     * @param {int} column - The column number of the matrix.
     * @param {*} value - The default value for every element in the matrix.
     */
    constructor() {
        var row = 230;
        var column = 190;
        var value = 0;

        this._mapD = new Array(row);

        for (var i = 0; i < row; i++) {
            this._mapD[i] = new Array(column);
            for (var j = 0; j < column; j++) {
                this._mapD[i][j] = value;
            }
            if (i % 3 === 0) {
                column++;
            }
        }
        // tru
        // 148 row
        // 98 y
        for (var i = 144; i < 154; i++) {
            for (var j = 190; j < 200; j++) {
                this._mapD[i][j] = 2;
            }
        }

        // ball
        // 27 row
        // 20 column
        // TODO
        this._mapD[26][20] = 4;
        this._mapD[27][19] = 4;
        this._mapD[28][20] = 4;
        //position ball start game
        this._mapD[27][20] = 1;


    }

    /**
     * Getter of the row number of the matrix.
     * @returns {int} The row number.
     */
    get row() {
        return this.row;
    }

    getXball(h, alpha) {
        console.log(Math.cos(alpha) * h);
        return Math.cos(alpha) * h;
    }

    getYball(h, alpha) {
        console.log(Math.sin(alpha) * h);
        return Math.sin(alpha) * h;
    }

    setPositionBall(x, y) {
        return this._mapD[x][y] = 1;
    }

    /**
     * Getter of the column number of the matrix.
     * @returns {int} The column number.
     */
    get column() {
        return this.column;
    }

    /**
     * Getter of the matrix.
     * @returns {Array} The matrix.
     */
    get mapD() {
        return this._mapD;
    }

    /*var checkIsInHole = function (h, alpha) {


        for (var i = 144; i < 154; i++) {
            for (var j = 190; j < 200; j++) {
                if (this._mapD[i][j] === setPositionBall(getXball(h, alpha), getYball(h, alpha))) {
                    return true;
                }
            }
            if (i % 3 === 0) {
                column++;
            }
            return false;

        }

    };
    */

    /**
     * Getter of an element of the matrix.
     * If the element that we try to access is out of range, it returns undefined.
     * @param {int} rowNumber - The row number of the element.
     * @param {int} columnNumber - The column number of the element.
     * @returns {*} Returns an element.
     */
    getElement(rowNumber, columnNumber) {
        if (rowNumber >= this.row || columnNumber >= this.column) {
            return;
        }
        return this.mapD[rowNumber][columnNumber];
    }

    /**
     * Setter of an element of the matrix.
     * If the element that we try to update is out of range, it returns an error.
     * @param {int} rowNumber - The row number of the element.
     * @param {int} columnNumber - The column number of the element.
     * @param {*} newValue - The new value of the element.
     */
    setElement(rowNumber, columnNumber, newValue) {
        if (rowNumber >= this.row || columnNumber >= this.column) {
            // TODO should throw an error
            console.error('out of range');
        }
        else {
            this.mapD[rowNumber][columnNumber] = newValue;
        }
    }

    toString() {

        var row = 230;
        var column = 190;
        var string = "";
        for (var i = 0; i < row; i++) {
            string += "{ ";
            for (var j = 0; j < column; j++) {
                if (j % 2 === 0) {
                    string += this._mapD[i][j];
                }
            }
            if (i % 3 === 0) {
                column++;
            }
            string += "}\n";

        }
        console.log(string);
    }

}

module.exports = MapDeform;