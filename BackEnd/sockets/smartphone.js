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

    /////////////////////////////////           Smartphone Socket Events               /////////////////////////////////

    socket.on('joinGame', joinGame);

    socket.on('go', go);

    socket.on('ready', ready);

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

    /////////////////////////////////       Callback Smartphone Socket Events          /////////////////////////////////

    /**
     * This function aimed to allow a player to join the game.
     * <ul>
     *     <li>If the game is not started it emits the 'gameNoStarted' event.</li>
     *     <li>If there is no place anymore for the player it emits the 'noPlaceAvailable' event.</li>
     *     <li>If there is place for the player (and he's not the last one) it emits the 'waitingToStart' event.</li>
     *     <li>If there is place for the player (and he's the last one) it emits the 'gameStart' event.</li>
     * </ul>
     * @param {Object} params - The json object containing the parameters.
     */
    function joinGame (params) {
        console.log('Somebody is trying to join the game');
        switch (game.addPlayer(params.name)) {
            case true :
                lastOneToJoin(socket);
                break;
            case false:
                socket.emit('waitingToStart', {});
                console.info('Player ' + params.name + ' joined the game');
                break;
            case -1 :
                socket.emit('noPlaceAvailable', {});
                console.error('There is no place anymore to join the game');
                break;
            case -2 :
                socket.emit('gameNotStarted', {});
                console.error('The game is not started yet');
                break;
            default:
                console.error('This case is not supposed to happen');
        }
    }

    /**
     * This function aimed to get and analyse the shoot.
     * @param {Object} params - The json object containing the parameters.
     */
    function go (params) {
        var CLUB_MASS = 0.460; // 460 grammes

        var datas = params;

        var strike_force = game.calculateStrikeForce(datas, CLUB_MASS);

        console.log('force de frappe ' + strike_force + 'N');

        var result          = {};
        result.valid        = game.isValidShoot(datas, strike_force);
        result.strike_force = Math.abs(strike_force);

        var response = JSON.stringify(result);

        socket.emit('goResponse', response);

        if (result.valid) {
            // calculate with the server
            game.go(result.strike_force);
        }
    }

    /**
     * This function aimed to prepare the sphero to roll.
     * It emits the response 'ok' or 'bad' to the smartphone.
     * @param {Object} params - The json object containing the parameters.
     */
    function ready (params) {
        var response;
        if (game.playerReady()) {
            response = 'ok';
        } else {
            response = 'bad';
        }
        socket.emit('readyResponse', {response: response});
    }

    /////////////////////////////////          Smartphone utilities function           /////////////////////////////////

    /**
     * This function aimed to start the game when the last player to join has joined the game.
     * @param socket
     */
    function lastOneToJoin (socket) {
        socket.emit('waitingToStart', {});
        console.info('Player ' + params.name + ' joined the game');
        setTimeout(function () {
            smartphoneSocket.emit('gameStart', {});
            console.info('We can start the game');
            setTimeout(function () {
                game.getPlayerToPlay(function (playerName) {
                    smartphoneSocket.emit('play', {name: playerName});
                });
            }, 1000)
        }, 2000);
    }

});

module.exports = smartphoneSocket;