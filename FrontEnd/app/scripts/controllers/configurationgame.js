'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ConfigurationgameCtrl
 * @description
 * # ConfigurationgameCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('ConfigurationGameCtrl', ['$scope', 'services', 'player',  function ($scope, services, player) {

    // The number of player.
    $scope.nbOfPlayer=1;

    /**
     * Function increment. This function increments the number of players.
     */
    $scope.increment = function (numberOfPlayer) {
      $scope.nbOfPlayer++;
    },

    /**
     * Function decrement. This function decrements the number of players.
     */
    $scope.decrement = function (numberOfPlayer) {
      if($scope.nbOfPlayer>1){
       $scope.nbOfPlayer--;
      }
    },

    /**
     * Function sendNumberOfPlayer. This function sends the number of player to the server and set the number of player in the service "player". It uses a function to post this number to the server.
     */
    $scope.sendNumberOfPlayer=function() {
      console.log("In ConfigurationGameCtrl: ",$scope.nbOfPlayer);
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

