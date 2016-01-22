'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:myNgController
 * @description
 * # myNgController
 */
angular.module('frontEndApp')
  .directive('myNgController', function () {
    return {
      restrict: 'A',
      compile: function (element, attrs) {

        console.log("aatrs", attrs.myNgController);
        element.attr('ng-controller', attrs.myNgController);
      }
    };
  });
