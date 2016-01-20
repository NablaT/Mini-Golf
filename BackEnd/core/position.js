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
    constructor () {
        this._latitude  = 0.0;
        this._longitude = 0.0;
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
}

module.exports = Position;