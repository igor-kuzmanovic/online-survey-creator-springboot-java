(function() {
  var app = angular
  .module('app', [ 'ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap']);

  app
    .config([
    '$httpProvider',
    function($httpProvider) {
      $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    } ])
  
    .animation('.view-animate', function() {
    return {
      enter: function(element, done) {
        element.css('display', 'none');
        element.fadeIn(400, done);
        return function() {
          element.stop();
        }
      }
    }
  });
})();
