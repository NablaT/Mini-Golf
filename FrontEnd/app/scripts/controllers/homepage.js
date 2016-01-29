'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('HomepageCtrl', ['$rootScope', 'services', 'player', '$location', '$controller', '$timeout', 'constants', function ($scope, services, player, $location, $controller, $timeout, constants) {

    // The id of the current page.
    $scope.currentPage = "menu"; //TODO: to change to menu
    $scope.controllerPage = "HomepageCtrl";
    $scope.nbOfPlayer = 1;
    $scope.players;
    $scope.messageForWaitingFrame = "Waiting for players ...";
    $scope.saveCurrentPlayer = "";
    $scope.socket;
    $scope.iconmenu = false;

    connect();
    getBackPlayer();
    getActivePlayer();
    
    /**
     * Function updateHomePage. This function updates the home page.
     */
    $scope.updateHomePage = function (id, controllerId) {
      $scope.currentPage = id;
      $scope.messageForWaitingFrame = "Waiting for players ...";
      $scope.saveCurrentPlayer = "";
      $scope.iconmenu = false;
      //$scope.controllerPage= controllerId;
    }

    //TODO To change ! It's a temporary solution
    /**
     * Function increment. This function increments the number of players.
     */
    $scope.increment = function () {
      if ($scope.nbOfPlayer < 10) {
        $scope.nbOfPlayer++;
      }
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
        $scope.currentPage = "waitingFrame";
        services.postNumberOfPlayer($scope.nbOfPlayer).then(
          function (data) {
            console.log(data);
            $scope.players = data;
            console.log("player 0", $scope.players[0]);
            //$scope.players=data
          },
          function (msg) {
            console.log(msg);
          }
        )


        //$timeout($scope.getbackScore(),500);
        //$scope.getbackScore();
      }
    //TODO END

    /**
     * Function verifyGameIsRunning. This function verifies if the game is running.
     */
    $scope.verifyGameIsRunning = function () {
      services.getGameIsRunning().then(
        function (data) {
          if (data === true) {
            //$scope.currentPage = ' scores';
            $location.path("/loadingContainer");
          }
          else {
            $location.path("/loadingContainer");
          }
        },
        function (error) {
          console.log("error in the game verification");
        }
      );
    };


    /**
     * Function Connect. This function makes the connection with the server.
     **/
    function connect() {
      $scope.socket = io.connect(constants.backendUrlEcran);

      $scope.socket.io.on('connect_error', function (err) {
        console.log('Error connecting to server');
      });
    }

    /**
     * Function getBackPlayer. This function gets back the player list from the server.
     **/
    function getBackPlayer() {
      $scope.socket.on("players", function (params) {
        if (params !== {}) {
          $scope.$apply(function () {
            $scope.players = params;
            $scope.messageForWaitingFrame = "The game is starting ...";
          });
        }
      });
    }

    /**
     * Function getActivePlayer. This function gets back the active player.
     */
    function getActivePlayer() {
      $scope.socket.on("playerToPlay", function (params) {
        if (params !== {}) {
          $scope.$apply(function () {
            $scope.players._playerName;
            for (var i = 0; i < $scope.players.length; i++) {
              $scope.players[i].activePlayer = false;
              if ($scope.players[i]._playerName === params.playerName) {
                $scope.players[i].activePlayer = true;
              }
            }
            if ($scope.players.length == $scope.nbOfPlayer) {
              $scope.currentPage = "scores";
            }
          });
        }
      });
    }

    /**
     * Function OpenMenu. This function puts all the players
     * as active player.
     */
    $scope.openMenu = function () {
      for (var i = 0; i < $scope.players.length; i++) {
        if ($scope.players[i].activePlayer) {
          $scope.saveCurrentPlayer = $scope.players[i]._playerName;
          console.log("OpenMenu saveCurrent player: ", $scope.saveCurrentPlayer);
        }
        $scope.players[i].activePlayer = true;
      }
      $scope.iconmenu = true;
    }

    /**
     * Function closeMenu. This functions puts all the players
     * as non-active player except the "real" active player.
     */
    $scope.closeMenu = function () {
      console.log("CloseMENU saveCurrent player: ", $scope.saveCurrentPlayer);
      for (var i = 0; i < $scope.players.length; i++) {
        $scope.players[i].activePlayer = false;
        if ($scope.players[i]._playerName === $scope.saveCurrentPlayer) {
          $scope.players[i].activePlayer = true;
        }
      }
      $scope.iconmenu = false;
    }
  }]);
