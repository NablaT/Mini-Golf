'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ScoresCtrl
 * @description
 * # ScoresCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('ScoresCtrl', ['$scope','services', 'player', function ($scope, services, player) {

    $scope.nbOfPlayer=player.getNbPlayer();

    $scope.getbackScore=function() {
      services.getScore().then(
        function (data) {
          console.log(data);
        },
        function (msg) {
          console.log(msg);
        }
      );
    },

      $scope.sendMap=function(map){
        console.log(map);
        services.postMap(map).then(
          function(data){
            console.log(data);
          },
          function (msg){
            console.log(msg);
          }
        )
    },

      $scope.getbackPlayer=function(){
        $scope.nbOfPlayer=player.getNbPlayer();
      }
  }]);
