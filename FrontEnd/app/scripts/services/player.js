'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.player
 * @description
 * # player
 * Factory in the frontEndApp.
 */
angular.module('frontEndApp')
  .factory('position', function () {
    var numberOfPlayer;

    return {

      /**
       * Function getNbPlayer. This functions returns the number of player for the game.
       * @returns {*}
       */
      getNbPlayer: function () {
        return numberOfPlayer;
      },

      /**
       * Function setNbPlayer. This function sets the number of player for the game.
       * @param number
       */
      setNbPlayer: function(number){
        numberOfPlayer=number;
      }
    };
  });
