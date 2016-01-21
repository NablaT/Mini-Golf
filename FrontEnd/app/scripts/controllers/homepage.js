'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('HomepageCtrl', ['$scope', 'services', 'player', function ($scope, services, player) {

    // The id of the current page.
    $scope.currentPage = "menu"; //TODO: to change to menu

    $scope.nbOfPlayer = 1;

    /**
     * Function updateHomePage. This function updates the home page.
     */
    $scope.updateHomePage = function (id) {
      $scope.currentPage = id;
    }

    //TODO To change ! It's a temporary solution
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
     */
      $scope.sendNumberOfPlayer = function () {
        console.log("In ConfigurationGameCtrl: ", $scope.nbOfPlayer);
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

    //TODO END

  }]);
