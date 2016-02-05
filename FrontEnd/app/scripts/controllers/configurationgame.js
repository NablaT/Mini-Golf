'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ConfigurationgameCtrl
 * @description
 * # ConfigurationgameCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('ConfigurationGameCtrl', ['$scope', 'services', 'position', 'homepage', function ($scope, services, position, homepage) {

    // The number of player.
    $scope.nbOfPlayer = 1;

    /**
     * Function increment. This function increments the number of players.
     */
    $scope.increment = function () {
      $scope.nbOfPlayer++;
      console.log($scope.nbOfPlayer);
    },

    /**
     * Function decrement. This function decrements the number of players.
     */
      $scope.decrement = function () {
        if ($scope.nbOfPlayer > 1) {
          $scope.nbOfPlayer--;
        }
      },

    /**
     * Function sendNumberOfPlayer. This function sends the number of player to the server and set the number of player in the service "player". It uses a function to post this number to the server.
     **/

      $scope.sendNumberOfPlayer = function () {
        player.setNbPlayer($scope.nbOfPlayer);
        services.postGameIsRunning(true);
        services.postNumberOfPlayer($scope.nbOfPlayer).then(
          function (data) {
            console.log(data);
          },
          function (msg) {
            console.log(msg);
          }
        )
      }

  }]);

