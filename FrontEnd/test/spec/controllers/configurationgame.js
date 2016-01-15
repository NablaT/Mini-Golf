'use strict';

describe('Controller: ConfigurationgameCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndApp'));

  var ConfigurationgameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfigurationgameCtrl = $controller('ConfigurationgameCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConfigurationgameCtrl.awesomeThings.length).toBe(3);
  });
});
