/**
 * Created by guillaume on 25/01/2016.
 */

var io   = require('../core/core.js').getIO(),
    game = require('../game/game.js');

// Route for the smartphone socket.
var smartphoneSocket = io.of('/smartphone');

smartphoneSocket.on('connect', function (socket) {
    console.log('connected smartphone');

    /////////////////////////////////            Base Socket Events                    /////////////////////////////////

    socket.on('disconnect', disconnect);

    socket.on('error', error);

    socket.on('reconnect', reconnect);

    socket.on('reconnect_attempt', reconnectAttempt);

    socket.on('reconnecting', reconnecting);

    socket.on('reconnect_error', reconnectError);

    socket.on('reconnect_failed', reconnectFailed);

    /////////////////////////////////           Mini Golf Socket Events                /////////////////////////////////

    socket.on('joinGame', joinGame);

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

    /////////////////////////////////       Callback Mini-Golf Socket Events           /////////////////////////////////

    /**
     * This function aimed to allow a player to join the game.
     * <ul>
     *     <li>If the game is not started it emits the 'gameNoStarted' event.</li>
     *     <li>If there is no place anymore for the player it emits the 'noPlaceAvailable' event.</li>
     *     <li>If there is place for the player it emits the 'waitingToStart' event.</li>
     * </ul>
     * @param {Object} params - The json object containing the parameters.
     */
    function joinGame (params) {
        console.log('Somebody is trying to join the game');
        var tmp = game.addPlayer(params.name, gameStart);
        switch (tmp) {
            case 0 :
                socket.emit('waitingToStart', {});
                console.info('Player ' + params.name + ' joined the game');
                break;
            case 1 :
                socket.emit('noPlaceAvailable', {});
                console.error('There is no place anymore to join the game');
                break;
            case 2 :
                socket.emit('gameNotStarted', {});
                console.error('The game is not started yet');
                break;
            default:
                console.error('This case is not supposed to happen');
        }
    }

    /**
     * This function emits the event 'gameStart'.
     */
    function gameStart () {
        smartphone.emit('gameStart', {})
    }

});

module.exports = smartphoneSocket;