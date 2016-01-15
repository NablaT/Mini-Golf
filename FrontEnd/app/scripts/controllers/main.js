'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('MainCtrl', ['$scope','services', function ($scope, services) {

    $scope.closeElement=function(){
      angular.element("firstelement").hide();
    }
  }]);
