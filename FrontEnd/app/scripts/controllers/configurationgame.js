'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ConfigurationgameCtrl
 * @description
 * # ConfigurationgameCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('ConfigurationGameCtrl', ['$scope', 'services', function ($scope, services) {

    $scope.nbOfPlayer=0;

    $scope.increment = function (numberOfPlayer) {
      $scope.nbOfPlayer++;
    },

    $scope.decrement = function (numberOfPlayer) {
      if($scope.nbOfPlayer>0){
       $scope.nbOfPlayer--;
      }
    },

    $scope.sendNumberOfPlayer=function() {
      console.log($scope.nbOfPlayer);
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

