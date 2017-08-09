(function () {
  angular.module('app')
    .config(config);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: '/views/home.html',
        controller: 'HomeController',
        controllerAs: 'hc'
    })
			.when('/survey/new', {
        templateUrl: '/views/surveyCreation.html',
        controller: 'SurveyCreationController',
        controllerAs: 'scc'
    })
      .when('/survey/new/:hashedId', {
        templateUrl: '/views/surveyCustomization.html',
        controller: 'SurveyCustomizationController',
        controllerAs: 'scc'
    })
			.when('/user/notifications', {
        templateUrl: '/views/notifications.html',
    })
      .otherwise({
        redirectTo:'/home'
    });

    $locationProvider.html5Mode(true);
  }

}());
