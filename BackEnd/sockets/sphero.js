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

/**
 * This function broadcasts the 'go' event.
 * @param {int} velocity - The velocity sphero.
 */
var goSphero = function (velocity) {
    spheroSocket.emit('go', {"velocity": velocity});
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

/**
 * This function broadcasts the 'ready' event.
 * @param {int} angle - The direction for the sphero.
 */
var ready = function (angle) {
    spheroSocket.emit('ready', {angle: angle});
};

module.exports = {
    sphero           : spheroSocket,
    goSphero         : goSphero,
    startCalibration : startCalibration,
    finishCalibration: finishCalibration,
    ready            : ready
};