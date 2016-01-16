/**
 * Created by guillaume on 16/01/2016.
 */

var assert = require('assert');
describe('Matrix test', function () {

    var Matrix = require('../core/matrix.js'),
        matrixDefault,
        matrix;

    beforeEach(function () {
        matrixDefault = new Matrix(3, 4);
        matrix        = new Matrix(2, 5, 2);
    });

    describe('Getter test', function () {
        it('should get the row number', function () {
            assert.equal(3, matrixDefault.row);
            assert.equal(2, matrix.row);
        });

        it('should get the column number', function () {
            assert.equal(4, matrixDefault.column);
            assert.equal(5, matrix.column);
        });

        it('should get an element', function () {
            for (var i = 0, rowLength = matrixDefault.row; i < rowLength; i++) {
                for (var j = 0, columnLength = matrixDefault.column; j < columnLength; j++) {
                    assert.equal(0, matrixDefault.getElement(i, j));
                }
            }
            for (var k = 0, rowLength2 = matrix.row; k < rowLength2; k++) {
                for (var l = 0, columnLength2 = matrix.column; l < columnLength2; l++) {
                    assert.equal(2, matrix.getElement(k, l));
                }
            }
        });

        it('should returns undefined when the element is out of range access', function () {
            assert.equal(undefined, matrixDefault.getElement(3, 4));
            assert.equal(undefined, matrix.getElement(10, 20));
        })
    });

    describe('Setter test', function () {
        it('should update the element', function () {
            matrixDefault.setElement(2, 2, 4);
            matrix.setElement(1, 4, 0);
            assert.equal(4, matrixDefault.getElement(2, 2));
            assert.equal(0, matrix.getElement(1, 4));
        });

        // TODO add a test that show that we cannot update an element out of range.
    })

});