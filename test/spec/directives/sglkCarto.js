'use strict';

describe('Directive: sglkCarto', function () {

  // load the directive's module
  beforeEach(module('helloOpenlayersApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sglk-carto></sglk-carto>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the sglkCarto directive');
  }));
});
