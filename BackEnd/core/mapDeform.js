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
        var row = 226;
        var column = 270;
        var value = "-";
        // position ball
        this._x = 203;
        this._y = 53;
        var angle = 10;

        this._mapD = new Array(row);

        for (var i = 0; i < row; i++) {
            this._mapD[i] = new Array(column);
            for (var j = 0; j < column; j++) {
                var dist = Math.tan(this.toRadians(angle)) * i;
                if (dist > j) {
                    this._mapD[i][j] = " ";
                }
                else if ((270 - dist) < j) {
                    this._mapD[i][j] = " ";
                } else {
                    this._mapD[i][j] = value;
                }
            }

        }
        // trou
        // 82 row
        // 230 col
        for (var i = 75; i < 85; i++) {
            for (var j = 220; j < 230; j++) {
                this._mapD[i][j] = " ";
            }
        }

        // ball
        // 27 row
        // 20 column
        // TODO
        for (var i = 200; i < 206; i++) {
            for (var j = 50; j < 56; j++) {
                this._mapD[i][j] = " " ;
            }
        }
        /*this._mapD[26][20] = 4;
        this._mapD[27][19] = 4;
        this._mapD[28][20] = 4;
        this._mapD[27][21] = 4;
         */
        //position ball start game
        this.setXball(this._x);
        this.setYball(this._y);
       // this._mapD[this._x][this._y] = 1;
        this.printball(this._x,this._y);

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

        this.printball(x,y);
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

    toRadians(angle) {
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

        if ((75 < x && 85 > x ) && (220 < y && 230 > y)) {
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

    printball(x,y){
        for (var i = x-2; i < x+2; i++) {
            for (var j = y-2; j < y+2; j++) {
                this._mapD[i][j] = "#" ;
            }
        }
    }

    toString() {
        var row = 226;
        var column = 270;
        var string = "";
        for (var i = 0; i < row; i++) {
            string += "{ ";
            for (var j = 0; j < column; j++) {
                string += this._mapD[i][j];
            }
            string += "}\n";
        }
        console.log(string);
    }

}

module.exports = MapDeform;