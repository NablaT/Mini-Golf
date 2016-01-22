'use strict';

describe('Controller: LoadingCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndApp'));

  var LoadingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoadingCtrl = $controller('LoadingCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoadingCtrl.awesomeThings.length).toBe(3);
  });
});
