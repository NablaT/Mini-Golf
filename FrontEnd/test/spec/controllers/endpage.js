'use strict';

describe('Controller: EndpagectrlCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndApp'));

  var EndpagectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EndpagectrlCtrl = $controller('EndpagectrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EndpagectrlCtrl.awesomeThings.length).toBe(3);
  });
});
