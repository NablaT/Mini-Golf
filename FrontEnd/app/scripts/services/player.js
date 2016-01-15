'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.player
 * @description
 * # player
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
  .factory('player', function () {
    // Service logic
    // ...

    var numberOfPlayer;

    // Public API here
    return {
      getNbPlayer: function () {
        return numberOfPlayer;
      },

      setNbPlayer: function(number){
        console.log("In service player: ",number);
        numberOfPlayer=number;
      }
    };
  });
