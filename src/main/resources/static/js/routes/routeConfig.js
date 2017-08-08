(function () {
  angular.module('app')
    .config(config);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
    })
      .when('/home', {
        templateUrl: '/views/home.html',
        controller: 'HomeController',
        controllerAs: 'hc'
    })
      .when('/survey/create/:hashedId', {
        templateUrl: '/views/surveyCreator.html',
        controller: 'SurveyCreatorController',
        controllerAs: 'scc'
    })
      .otherwise({
        redirectTo:'/'
    });

    $locationProvider.html5Mode(true);
  }

}());