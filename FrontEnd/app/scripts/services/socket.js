'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.socket
 * @description
 * # socket
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
  .factory('socket', ['constants', '$q', function (constants, $q) {

    //We make variable declaration here to be able to use socket in all of our functions.
    var socket;

    return {

      /**
       * Function connect. This function etablishes the connection with the server thanks to socket.io. We catch error while the connection
       * process.
       */
      connect: function () {
        socket = io.connect(constants.backendUrlEcran, function(){
          console.log("Connection success");
        });
        socket.io.on('connect_error', function (err) {
          console.log('Error connecting to server');
        });
      },

      /**
       * Function listenPlayers. This function is listening the server, when a changes has been made on playerAddition (a player has joined the game)
       * we return the new value.
       */
      listenPlayers: function () {
        return socket.on('players', function (params) {
          console.log("params: ",params);
          console.log("liste of PLayers: ", params[0]._playerName);
          return params;
        })
      },

      /**
       * Function getPlayers. This function get back the score from the server.
       * @returns {*}
       */
      getPlayers: function () {
        var deferred = $q.defer();
        socket.on('players', function (params) {
          if (params !== {}) {
            console.log("getscore socket: ", params);
            deferred.resolve(params);
          }
          else {
            deferred.reject('Error in getScore, empty object received');
          }
        });
        return deferred.promise;
      },

      /**
       * Function listenDisconnection. This function is listening the disconnection with the server in order to alert users.
       */
      listenDisconnection: function () {
        socket.on('disconnect', function () {
          console.log("I am disconnected from the server");
        });
      },
    };
  }]);
