var io = require("../core/core.js").getIO();

// Route for the sphero socket.
var spheroSocket = io.of('/sphero');

var callbackNewPos = function () {
    console.error('This message should not appeared');
};

var dist = null;

var getDist = function () {
    return dist;
};

/**
 * Event listener.
 * Every time a client socket try to connect to the serveur at the /sphero route,
 * this event 'connection' is triggered.
 */
spheroSocket.on('connection', function (socket) {
    // If the connection succeed, the 'connectSphero' event is emitted.
    socket.emit('connectSphero', {});

    /////////////////////////////////            Base Socket Events                    /////////////////////////////////

    socket.on('disconnect', disconnect);

    socket.on('error', error);

    socket.on('reconnect', reconnect);

    socket.on('reconnect_attempt', reconnectAttempt);

    socket.on('reconnecting', reconnecting);

    socket.on('reconnect_error', reconnectError);

    socket.on('reconnect_failed', reconnectFailed);

    /////////////////////////////////             Sphero Socket Events                 /////////////////////////////////

    socket.on('newPositionSphero', newPos);

    /////////////////////////////////         Callbacks Base Socket Events             /////////////////////////////////

    function disconnect () {
        console.log("Client disconnected for Root namespace");
    }

    function error (errorData) {
        console.log("An error occurred during Client connection for Root namespace");
        console.error(errorData);
    }

    function reconnect (attemptNumber) {
        console.log("Client Connection for Root namespace after " + attemptNumber + " attempts.");
    }

    function reconnectAttempt () {
        console.log("Client reconnect attempt for Root namespace");
    }

    function reconnecting (attemptNumber) {
        console.log("Client Reconnection for Root namespace - Attempt number " + attemptNumber);
    }

    function reconnectError (errorData) {
        console.log("An error occurred during Client reconnection for Root namespace");
        console.error(errorData);
    }

    function reconnectFailed () {
        console.log("Failed to reconnect Client for Root namespace. No new attempt will be done.")
    }

    /////////////////////////////////         Callback Sphero Socket Events            /////////////////////////////////

    function newPos (params) {
        dist = params.dist;
    }

});

/**
 * This function broadcasts the 'go' event.
 * @param {int} velocity - The velocity sphero.
 */
var goSphero = function (velocity) {
    //callbackNewPos = callback;
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
var stopCalibration = function () {
    spheroSocket.emit('stopCalibration', {});
};

/**
 * This function broadcasts the 'ready' event.
 * @param {int} angle - The direction for the sphero.
 */
var ready = function (angle) {
    spheroSocket.emit('ready', {angle: angle});
};

module.exports = {
    sphero          : spheroSocket,
    goSphero        : goSphero,
    startCalibration: startCalibration,
    stopCalibration : stopCalibration,
    ready           : ready,
    getDist         : getDist
};