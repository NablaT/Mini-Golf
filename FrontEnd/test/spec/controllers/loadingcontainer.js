'use strict';

describe('Controller: LoadingcontainerCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndApp'));

  var LoadingcontainerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoadingcontainerCtrl = $controller('LoadingcontainerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoadingcontainerCtrl.awesomeThings.length).toBe(3);
  });
});
