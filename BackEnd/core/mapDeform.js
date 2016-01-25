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
        this._mapD[27][21] = 4;

        //position ball start game
        this.setXball(27);
        this.setYball(20);
        this._mapD[27][20] = 1;


    }

    /**
     * Getter of the row number of the matrix.
     * @returns {int} The row number.
     */
    get row() {
        return this._row;
    }

    setPositionBall(h, alpha) {

        var x = parseInt(this.getnewXball(h, alpha));
        var y = parseInt(this.getnewYball(h, alpha));
        console.log(x);
        console.log(y);
        this._mapD[x][y] = 1;
        return this.check(x, y);
    }

    getnewXball(h, alpha) {
        var x = this.getXball() + Math.cos(alpha) * h;
        console.log(Math.cos(alpha) * h);
        return x;
    }

    getnewYball(h, alpha) {
        var y = this.getYball() + Math.sin(alpha) * h;
        console.log(Math.sin(alpha) * h);

        return y;
    }

    getXball() {
        return this.x;
    }

    getYball() {
        return this.y;
    }

    setXball(x) {
        this.x = x;
    }

    setYball(y) {
        this.y = y;
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

    check(x, y) {

        if ((144 < x && 154 > x ) && (190 < y && 200 > y)) {
            return true;
        } else {
            return false;
        }
    };


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
               // if (j % 2 === 0) {
                    string += this._mapD[i][j];
               // }
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