'use strict';

/**
 * Created by grahbari on 20/01/2016.
 */

/**
 * This class represents a position.
 */
class Position {

    /**
     * This is the default constructor.
     */
    constructor (latitude, longitude) {
        this._latitude  = latitude;
        this._longitude = longitude;
    }

    /**
     * Getter of the latitude double.
     * @returns {number} The latitude.
     */
    get latitude () {
        return this._latitude;
    }

    /**
     * Setter of the latitude.
     * @param {number} newLatitude - The new latitude.
     */
    set latitude (newLatitude) {
        this._latitude = newLatitude;
    }

    /**
     * Getter of the longitude double.
     * @returns {number} The longitude.
     */
    get longitude () {
        return this._longitude;
    }

    /**
     * Setter of the longitude.
     * @param {number} newLongitude - The new longitude.
     */
    set longitude (newLongitude) {
        this._longitude = newLongitude;
    }

    /**
     * This function updates the user position.
     * @param {number} newLatitude - The new latitude.
     * @param {number} newLongitude - The new longitude.
     */
    updatePosition (newLatitude, newLongitude) {
        this.latitude  = newLatitude;
        this.longitude = newLongitude;
    }

    /**
     * This function converts a position in centimeters to a position in pixels.
     * @returns {Object} An object containing the position in pixels.
     */
    toPixel () {
        var posPixel            = {};
        posPixel.longitudePixel = 400 - (this.longitude / 0.2825);
        posPixel.latitudePixel  = -600 + (this.latitude / (0.225 - 0.000296 * this.longitude));
        return posPixel;
    }

    /**
     * This function copies a position.
     * @param position
     * @returns {Position}
     */
    static copy (position) {
        var positionTmp = new Position(position.latitude, position.longitude);
        return positionTmp;
    }
}

module.exports = Position;