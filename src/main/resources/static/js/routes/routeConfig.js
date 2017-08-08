(function () {
  angular.module('app')
    .config(config);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {template:'Default route'})
      .when('/survey/:hashedId', {template:'Survey route'})
      .otherwise({redirectTo:'/'});

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

}());