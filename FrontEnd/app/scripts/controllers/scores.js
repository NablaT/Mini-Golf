'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ScoresCtrl
 * @description
 * # ScoresCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('ScoresCtrl', ['$scope', 'services', 'player', function ($scope, services, player) {

    $scope.nbOfPlayer = player.getNbPlayer();
    $scope.players;
    $scope.gameIsRunning=false;


    /**
     * Function getBackScore. This function gets back the score from the server. It calls the function getScore() in the service "services" (globalservices.js)
     */
    $scope.getbackScore = function () {
      services.getScore().then(
        function (data) {
          console.log(data);
        },
        function (msg) {
          console.log(msg);
        }
      );
    },


    /**
     * Function sendMap. This function sends the map to the server. It calls the function postMap() in the service "services" (globalservices.js)
     */
      $scope.sendMap = function (map) {
        console.log(map);
        services.postMap(map).then(
          function (data) {
            console.log(data);
          },
          function (msg) {
            console.log(msg);
          }
        )
      },

    /**
     * Function getbackPlayer. This functions gets back player from the service player and initilizes the scope with the number of players.
     */
      $scope.getbackPlayer = function () {
        $scope.nbOfPlayer = player.getNbPlayer();
        $scope.playerListInitialisation();
      },


    /**
     * Function playerListInitialisation. This function initializes the list of players according to the number of player.
     */
      $scope.playerListInitialisation = function () {
        var playerList = new Array();
        for (var i = 0; i < $scope.nbOfPlayer; i++) {
          playerList.push("Player " + (i + 1));
        }
        $scope.players = playerList;

        console.log("Player list: ", $scope.players);
      },

    /**
     * Function init. This function initializes the list of players.
     */
      $scope.init = function () {
        $scope.playerListInitialisation();
        var isrunning = services.getGameIsRunning();
        if($scope.players.length==0){
          console.log("PAF");
          angular.element("loading").show();
          angular.element("notloading").hide();
        }
        else{
          $scope.gameIsRunning=true;
        }
      }

    $scope.init();

  }]);
