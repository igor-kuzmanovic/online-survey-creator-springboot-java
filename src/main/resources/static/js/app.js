(function() {
  var app = angular
  .module('app', [ 'ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap', 'lr.upload']);

  app
    .config([
    '$httpProvider',
    function($httpProvider) {
      $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }])

    .animation('.view-animate', function() {
    return {
      enter: function(element, done) {
        element.css('display', 'none');
        element.fadeIn(400, done);
      }
    }})

    .animation('.table-animate', function() {
    return {
      leave: function(element, done) {
        element.fadeOut(400, done);
      }
    }})

})();
