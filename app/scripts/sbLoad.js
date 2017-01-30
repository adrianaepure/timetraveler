/**
 * Credit to Sam Barnes
 * http://stackoverflow.com/a/26781900/293847
 */

angular.module('sbLoad', [])

  .directive('onImgLoad', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        var fn = $parse(attrs.onImgLoad);
        elem.on('load', function (event) {
          scope.$apply(function() {
            fn(scope, { $event: event });
          });
        });
      }
    };
  }]);