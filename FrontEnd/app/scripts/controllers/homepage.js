'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('HomepageCtrl', ['$rootScope', 'services', 'player', '$location', '$controller' , '$timeout', function ($scope, services, player, $location, $controller, $timeout) {


    //console.log("controller: ",$controller("HomepageCtrl"));
    // The id of the current page.
    $scope.currentPage = "menu"; //TODO: to change to menu
    $scope.controllerPage="HomepageCtrl";
    //$scope.controllerPage=$controller('ConfigurationGameCtrl');
    $scope.nbOfPlayer = 1;
    $scope.players;

    /**
     * Function updateHomePage. This function updates the home page.
     */
    $scope.updateHomePage = function (id, controllerId) {
      $scope.currentPage = id;
      //$scope.controllerPage= controllerId;
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
      **/
      $scope.sendNumberOfPlayer = function () {
        player.setNbPlayer($scope.nbOfPlayer);
        //services.postGameIsRunning(true);
        $scope.currentPage ="scores";
        services.postNumberOfPlayer($scope.nbOfPlayer).then(
          function (data) {
            console.log(data);
            $scope.players=data;
            console.log("player 0", $scope.players[0]);
            //$scope.players=data
          },
          function (msg) {
            console.log(msg);
          }
        )


        //$timeout($scope.getbackScore(),500);
        $scope.getbackScore();


      }


      //TODO END

    $scope.verifyGameIsRunning = function () {
      console.log("oui bha oui");
      services.getGameIsRunning().then(
        function(data){
          if(data===true){
            //$scope.currentPage = 'scores';
            $location.path("/loadingContainer");
          }
          else{
            $location.path("/loadingContainer");
          }
        },
        function(error){
          console.log("error in the game verification");
        }
      );
      /*console.log("data back:",isrunning);
      if(isrunning==true){
        console.log("non");
        $scope.currentPage = 'scores';
      }
      else{
        $location.path("/loadingContainer");
      }*/

    },


    /**
     * Function getBackScore. This function gets back the score from the server. It calls the function getScore() in the service "services" (globalservices.js)
     */
    $scope.getbackScore = function () {
      console.log("jerentre");
      services.getScore().then(
        function (data) {
          $scope.players=data;
          //$scope.getbackScore();
          console.log(data);
        },
        function (msg) {
          console.log(msg);
        }
      );
    }

  }]);
