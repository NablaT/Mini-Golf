'use strict';
/**
 * Created by guillaume on 30/01/2016.
 */

/**
 * This class represents the kinect object.
 */
class Kinect {

    /**
     * The constructor of the kinect.
     * The shoot direction is received all the time in continuous by the kinect.
     * The shoot direction ready is the direction when the player starts his movement.
     * It sets the shoot direction to -1.
     */
    constructor () {
        this._shootDirection      = 315;
        this._shootDirectionReady = 315;
    }

    /**
     * Getter of the shoot direction.
     * @returns {number} The shoot direction.
     */
    get shootDirection () {
        return this._shootDirection;
    }

    /**
     * Setter of the shoot direction.
     * @param {number} newShootDirection - The new shoot direction.
     */
    set shootDirection (newShootDirection) {
        this._shootDirection = newShootDirection;
    }

    /**
     * Getter of the shoot direction when the player starts his movement.
     * @returns {number} The shoot direction.
     */
    get shootDirectionReady () {
        return this._shootDirectionReady;
    }

    /**
     * Setter of the shoot direction when the player starts his movement.
     * @param {number} newShootDirectionReady - The new shoot direction.
     */
    set shootDirectionReady (newShootDirectionReady) {
        this._shootDirectionReady = newShootDirectionReady;
    }

    /**
     * This function aimed to reset the shoot direction to -1.
     */
    resetDirection () {
        this.shootDirection = -1;
    }

    /**
     * This function gets the direction from kinect and transmits it to the callback function.
     * @param {boolean} isRighty - A boolean to know if the user is righty.
     * @param {function} callback - The callback function to be triggered the direction is correct.
     * @returns {boolean} True if the direction is correct, else false.
     */
    playerReady (isRighty, callback) {
        var shootDirectionTmp = this.shootDirection; // We do this to be sure that the shoot direction does not change between 2 calls to the getter.
        if (shootDirectionTmp !== -1) {
            this.resetDirection();
            this.shootDirectionReady = shootDirectionTmp;
            callback(shootDirectionTmp, isRighty);
            return true;
        }
        return false;
    }
}

/**
 * The instance of the kinect.
 * This way we create a singleton.
 * @type {Kinect}
 */
var kinect = new Kinect();

module.exports = kinect;