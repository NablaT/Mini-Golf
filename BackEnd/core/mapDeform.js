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
        // position ball
        this._x = 27;
        this._y = 20;

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
        // trou
        // 148 row
        // 98 y
        for (var i = 220; i < 230; i++) {
            for (var j = 140; j < 150; j++) {
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
        this.setXball(this._x);
        this.setYball(this._y);
        this._mapD[this._x][this._y] = 1;


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
      //  console.log("1 x = ",x);
      //  console.log("1 y = ",y);

        this._mapD[x][y] = 1;
        return this.check(x, y);
    }

    getnewXball(h, alpha) {
        var x = this.getXball() + (Math.sin(this.toRadians(alpha)) * h);
       // console.log("1 x = ",x);
        this.setXball(x);
        return x;
    }

    getnewYball(h, alpha) {
        var y = this.getYball() + (Math.cos(this.toRadians(alpha)) * h);
     //   console.log("Y = ",Math.cos(this.toRadians(alpha)) * h);
     //   console.log(this.getYball());
        this.setYball(y);
        return y;
    }

    toRadians (angle) {
       // console.log("angles = ",angle * (Math.PI / 180));
    return angle * (Math.PI / 180);
}

    getXball() {
        return this._x;
    }

    getYball() {
        return this._y;
    }

    setXball(x) {
        this._x = x;
    }

    setYball(y) {
        this._y = y;
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

        if ((220 < x && 230 > x ) && (140 < y && 150 > y)) {
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