'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:JeuCtrl
 * @description
 * # JeuCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('JeuCtrl', ['$scope','global', function ($scope, $http) {

    $scope.sendScore=function(){
      service.getScore($scope).then(
        function(data){
          console.log(data);
        },
        function (msg){
          console.log(msg);
        }
      )
    }
  }]);
