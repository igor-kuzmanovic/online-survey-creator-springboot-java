(function () {
  angular.module("app")
    .directive('autoFocus', autoFocus);

  autoFocus.$inject = ['$timeout', '$parse'];

  function autoFocus($timeout, $parse) {

    return {
      link : function(scope, element, attrs) {
        var model = $parse(attrs.autoFocus);

        scope.$watch(model, function(value) {
          if (value === true) {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
      }
    };

  }
} ());