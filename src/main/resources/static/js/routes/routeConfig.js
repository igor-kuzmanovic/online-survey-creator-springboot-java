(function () {
  angular.module('app')
    .config(config);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainController',
        controllerAs: 'mc'
    })
      .when('/home', {
        templateUrl: '/views/home.html',
        controller: 'HomeController',
        controllerAs: 'hc'
    })
      .when('/survey/create/:hashedId', {
        templateUrl: '/views/surveyCreation.html',
        controller: 'SurveyCreationController',
        controllerAs: 'scc'
    })
      .otherwise({
        redirectTo:'/'
    });

    $locationProvider.html5Mode(true);
  }

}());