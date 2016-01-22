'use strict';

describe('Directive: myNgController', function () {

  // load the directive's module
  beforeEach(module('frontEndApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-ng-controller></my-ng-controller>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myNgController directive');
  }));
});
