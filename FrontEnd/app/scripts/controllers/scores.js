'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ScoresCtrl
 * @description
 * # ScoresCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('ScoresCtrl', ['$scope','serviceCtrl', function ($scope, service) {

    $scope.getbackScore=function(){
      service.postScore($scope.data).then(
        function(data){
          console.log(data);
        },
      function (msg){
        console.log(msg);
      }
      )
    }
  }]);
