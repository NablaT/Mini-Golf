'use strict';

/**
 * @ngdoc function
 * @name frontEndApp.controller:HomepageCtrl
 * @description
 * # HomepageCtrl
 * Controller of the frontEndApp
 */
angular.module('frontEndApp')
  .controller('HomepageCtrl', ['$scope', function ($scope) {

    // The id of the current page.
    $scope.currentPage = "menu";

    /**
     * Function updateHomePage. This function updates the home page.
     */
    $scope.updateHomePage = function (id) {
      console.log("scope",id);
      $scope.currentPage=id;
    }

  }]);
