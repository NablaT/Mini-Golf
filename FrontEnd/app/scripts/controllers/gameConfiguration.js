'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ConfigurationCtrl
 * @description
 * # ScoresCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('GameConfigurationCtrl', ['$scope','services', function ($scope, services) {

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
      }
  }]);
