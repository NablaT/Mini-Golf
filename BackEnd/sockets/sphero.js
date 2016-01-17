var io = require("../core/core.js").getIO();

// Route for the sphero socket.
var spheroSocket = io.of('/sphero');

/**
 * Event listener.
 * Every time a client socket try to connect to the serveur at the /sphero route,
 * this event 'connection' is triggered.
 */
spheroSocket.on('connection', function (socket) {
    // If the connection succeed, the 'connectSphero' event is emitted.
    socket.emit('connectSphero', {});
});

// TODO it should be the velocity and not the distance.
// TODO it seems that the velocity is beetween 0 et 255. Check the units and if it's right.
// TODO change the event name. In the sphero server too.
/**
 * This function broadcasts the 'test' event.
 * @param {int} distance - The distance.
 * @param {int} angle - An angle beetween 0 et 359 degrees.
 */
var testSphero = function (distance, angle) {
    spheroSocket.emit('test', {"dist": distance, "angle": angle});
};

/**
 * This function broadcasts the 'startCalibration' event.
 */
var startCalibration = function () {
    spheroSocket.emit('startCalibration', {});
};

/**
 * This function broadcasts the 'finishCalibration' event.
 */
var finishCalibration = function () {
    spheroSocket.emit('finishCalibration', {});
};

module.exports = {
    sphero: spheroSocket, testSphero: testSphero
};