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

    socket.on('startCalibration', startCalibration);

    socket.on('stopCalibration', stopCalibration);

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
     *     <li>If the player's name is already taken it emits the 'nameUnvalid' event.</li>
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
            case -3 :
                socket.emit('nameInvalid', {});
                console.error('A player with the name ' + params.name + ' already exists');
                break;
            default:
                console.error('This case is not supposed to happen');
        }
    }

    /**
     * This function aimed to get and analyse the shoot.
     * @param {Array} params - The array containing the parameters.
     */
    function go (params) {

        var CLUB_MASS = 0.460; // 460 grammes

        var strike_force = game.calculateStrikeForce(params, CLUB_MASS);

        console.log('force de frappe ' + strike_force + 'N');

        var result          = {};
        result.valid        = game.isValidShoot(params, strike_force);
        result.strike_force = Math.abs(strike_force);

        socket.emit('goResponse', result);

        if (result.valid) {
            game.go(result.strike_force,
                function (playerName) {
                    console.log('EVENT PLAY ' + playerName);
                    smartphoneSocket.emit('play', {name: playerName});
                },
                function () {
                    console.log('EVENT END');
                    smartphoneSocket.emit('end', {});
                }, function () {
                    console.log('EVENT OUT OF MAP');
                    socket.emit('outOfMap', {});
                }
            );
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

    /**
     * This function aimed to start the calibration of the sphero.
     * @param {Object} params - The json object containing the parameters.
     */
    function startCalibration (params) {
        game.startCalibration();
    }

    /**
     * This function aimed to stop the calibration of the sphero.
     * @param {Object} params - The json object containing the parameters.
     */
    function stopCalibration (params) {
        game.stopCalibration();
    }

    /////////////////////////////////          Smartphone utilities function           /////////////////////////////////

    /**
     * This function aimed to start the game when the last player to join has joined the game.
     * @param socket
     */
    function lastOneToJoin (socket) {
        // TODO maybe we can skip this step and directly triggered the 'gameStart' event.
        socket.emit('waitingToStart', {});
        console.info('The last player joined the game');

        // This timeout is to handle the change view in smartphone !
        setTimeout(function () {
            smartphoneSocket.emit('gameStart', {});
            game.screenGameStart();
            console.info('We can start the game');

            // This timeout finds the player who is supposed to play and emit the event 'play' at every smartphone.
            setTimeout(function () {
                smartphoneSocket.emit('play', {name: game.getPlayerToPlay().playerName});
            }, 1000)

        }, 2000);
    }

});

module.exports = smartphoneSocket;