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

    $scope.nbOfPlayer=1;

    $scope.increment = function (numberOfPlayer) {
      $scope.nbOfPlayer++;
    },

    $scope.decrement = function (numberOfPlayer) {
      if($scope.nbOfPlayer>1){
       $scope.nbOfPlayer--;
      }
    },

    $scope.sendNumberOfPlayer=function() {
      console.log("In ConfigurationGameCtrl: ",$scope.nbOfPlayer);
      player.setNbPlayer($scope.nbOfPlayer);
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

