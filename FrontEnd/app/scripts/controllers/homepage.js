'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('HomepageCtrl', ['$rootScope', 'services',
    'position', '$location', '$controller', '$timeout',
    'constants', 'makeSound',
    function ($scope, services, position, $location, $controller, $timeout, constants,makeSound) {

      // The id of the current page.
      $scope.currentPage = "menu"; //menu
      $scope.current3DPage = "scripts/gameMap/homeEnvironment.html"; //scripts/gameMap/homeEnvironment.html
      
      $scope.controllerPage = "HomepageCtrl";
      $scope.nbOfPlayer = 1;
      $scope.players;

      $scope.messageForWaitingFrame = "En attente que le jeu se lance";
      $scope.saveCurrentPlayer = "";
      $scope.socket;
      $scope.iconmenu = false;
      $scope.currentScreen;

      $scope.audio;
      $scope.winnerName="";

      //giveWinner();
      connect();
      getBackPlayer();
      checkingMessageForWaitingFrame();
      checkingIfGameStarts();
      checkingIfGameStops();


      /**
       * Function updateHomePage. This function updates the home page.
       */
      $scope.updateHomePage = function (id, path3DEnvironement) {
        $scope.currentPage = id;
        if (!(path3DEnvironement === '')) {
          $scope.current3DPage = path3DEnvironement;
        }
        $scope.messageForWaitingFrame = "En attente que le jeu se lance";
        $scope.saveCurrentPlayer = "";
        $scope.iconmenu = false;
      }

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
          //player.setNbPlayer($scope.nbOfPlayer);
          //services.postGameIsRunning(true);
          $scope.currentPage = "waitingFrame";
          $scope.messageForWaitingFrame = "En attente des joueurs ...";
          services.postNumberOfPlayer($scope.nbOfPlayer).then(
            function (data) {
              console.log(data);
              console.log("number of players: ", $scope.nbOfPlayer);
              $scope.players = data;


              console.log("player 0", $scope.players[0]);
              //$scope.players=data
            },
            function (msg) {
              console.log(msg);
            }
          )
        }

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
              console.log("Getbackplayer: value params:", params);
            });
          }
        });
      }

      /**
       * Function checkingMessageForWaitingFrame. This function is always checking the status of the game.
       */
      function checkingMessageForWaitingFrame(){
        console.log("je rentre dans checking for waiting frame");
        /*$scope.audio = new Audio('sound/waiting_sound.mp3');
        $scope.audio.play();*/
        $scope.socket.on("waitingForPlayers", function (params) {
          if (params !== {}) {
            $scope.$apply(function () {
              $scope.messageForWaitingFrame = "En attente des joueurs";


              makeSound.setSong("sound/waiting_song.mp3");
              makeSound.playSong();
            });
          }
        });
      }

      /**
       * Function checkingIfGameStarts. This functions verifies if the game has been ran.
       */
      function checkingIfGameStarts(){
        $scope.socket.on("gameStart", function (params) {
          if (params != {}) {
            $scope.$apply(function () {
              makeSound.stopSong();
              if($scope.currentScreen==="game"){
                $scope.current3DPage = "scripts/GameMap/index.html";
                $scope.currentPage = "gameContainer";
              }
              else if($scope.currentScreen==="guide"){
                $scope.current3DPage = "scripts/gameMap/swingGuide.html";
                $scope.currentPage = "swingGuideContainer";
              }
              else{
                updateScore();
              }
            });
          }
        });
      }

      /**
       * Function checkingIfGameStops. This function is checking the end of the game  by listening
       * "endGame" event on the server.
       **/
      function checkingIfGameStops(){
        $scope.socket.on("endGame", function (params) {
          if (params != {}) {
            $scope.$apply(function () {
              giveWinner();//TODO
              //$scope.winnerName="Pierre";// TODO TOCHANGE
              if($scope.currentScreen==="game"){
                $scope.current3DPage="views/endPage.html";
                $scope.currentPage="endPageContainer";
              }
            });
          }
        });

      }

      /**
       * Function verifyGameIsRunningForTrack. This function is checking if the game has been ran or not. If the game is
       * running, it update the content of the track frame.
       */
      $scope.verifyGameIsRunningForTrack = function () {
        $scope.current3DPage="views/loading.html";
        $scope.currentPage="loadingContainer";
        $scope.currentScreen="game";
      };


      /**
       * Function verifyGameIsRunningForGuide. This function checks if the game has been ran. If the game is running
       * it updates the content of the track frame.
       */
      $scope.verifyGameIsRunningForGuide = function () {
        $scope.current3DPage="views/loading.html";
        $scope.currentPage="loadingContainer";
        $scope.currentScreen="guide";
      }


      /**
       * Function updateContentSwingGuide. This function updates the content of the home page
       * for the swing guide.
       */
      $scope.updateContentSwingGuide = function(){
        $scope.current3DPage="scripts/gameMap/swingGuide.html";
        $scope.currentPage="swingGuideContainer";
      }

      /**
       * Function updateContentSwingGuide. This function updates the content of the home page
       * for the swing guide.
       */
      $scope.updateContentEndPage = function(){
        $scope.current3DPage="views/endPage.html";
        $scope.currentPage="endPageContainer";
      }

      /**
       * Function OpenMenu. This function puts all the players
       * as active player.
       */
      $scope.openMenu = function () {
        for (var i = 0; i < $scope.players.length; i++) {
          if ($scope.players[i]._activePlayer) {
            $scope.saveCurrentPlayer = $scope.players[i]._playerName;
            console.log("OpenMenu saveCurrent player: ", $scope.saveCurrentPlayer);
          }
          $scope.players[i]._activePlayer = true;
        }
        $scope.iconmenu = true;
      }

      /**
       * Function closeMenu. This functions puts all the players
       * as non-active player except the "real" active player.
       */
      $scope.closeMenu = function () {
        console.log("CloseMENU saveCurrent player: ", $scope.players);
        for (var i = 0; i < $scope.players.length; i++) {
          $scope.players[i]._activePlayer = false;
          if ($scope.players[i]._playerName === $scope.saveCurrentPlayer) {
            $scope.players[i]._activePlayer = true;
          }
        }
        $scope.iconmenu = false;
      }

      /**
       * Function updateScore. This function update the content of the current page by changing the current page name by score
       */
      function updateScore() {
        $scope.currentPage = "scores";
      }

      function giveWinner(){
        var maxScore=0;
       // var playerList= new Array();
        var playerName;
        for(var i=0; i<$scope.players;i++){
          if(maxScore<$scope.players[i]._score){
            //playerList.add($scope.player[i]._playerName);
            playerName=$scope.player[i]._playerName;
            maxScore=$scope.player[i]._score;
          }
        }
      }
    }]);
