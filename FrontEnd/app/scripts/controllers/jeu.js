'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:JeuCtrl
 * @description
 * # JeuCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('JeuCtrl', ['$scope','$http', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $http.post('/scores', 10);


    $http.get('/map')
      .success(function(data) {
        $scope.informations = data;
        console.log(data);
      })
      .error(function(error) {
        console.log(error);
      });
  }]);
