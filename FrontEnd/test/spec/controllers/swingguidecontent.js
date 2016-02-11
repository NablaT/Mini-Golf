'use strict';

describe('Controller: SwingguidecontentCtrl', function () {

  // load the controller's module
  beforeEach(module('frontEndApp'));

  var SwingguidecontentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SwingguidecontentCtrl = $controller('SwingguidecontentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SwingguidecontentCtrl.awesomeThings.length).toBe(3);
  });
});
