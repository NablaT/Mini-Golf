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


    var socket;

    // Public API here
    return {
      connect: function () {
        console.log("coucou depuis socket");
        socket = io.connect(constants.backendUrlEcran);
      },

      listenPlayers: function(){
        console.log("in listenPlayers");
        socket.on('playerAddition',function(params){
          console.log("listenPLayers: ",params.name);
        })
      },

      getScores:function(){
        var deferred=$q.defer();
        socket.on('scores',function(params){
          if(params!=={}){
            console.log("getscore socket: ",params);
            deferred.resolve(params);
          }
          else{
            deferred.reject('Error in getScore, empty object received');
          }
        });
        return deferred.promise;
      }


    };
  }]);
