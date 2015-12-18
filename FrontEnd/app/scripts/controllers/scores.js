'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:ScoresCtrl
 * @description
 * # ScoresCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('ScoresCtrl', ['$scope','$http', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $http.get('/scores')
      .success(function(data) {
        $scope.informations = data;
        console.log(data);
      })
      .error(function(error) {
        console.log(error);
      });
  }]);
