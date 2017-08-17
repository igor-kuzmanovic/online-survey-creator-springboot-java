(function () {
  angular.module('app')
    .config(config);

  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
      templateUrl: '/views/login.html',
      controller: 'LoginController',
      controllerAs: 'lc'
    })
      .when('/registration', {
      templateUrl: '/views/registration.html',
      controller: 'RegistrationController',
      controllerAs: 'rc'
    })
      .when('/home', {
      templateUrl: '/views/home.html',
      controller: 'HomeController',
      controllerAs: 'hc'
    })
      .when('/survey/:hashedId', {
      templateUrl: '/views/survey.html',
      controller: 'SurveyController',
      controllerAs: 'sc'
    })
      .when('/survey/finish/:hashedId', {
      templateUrl: '/views/surveyFinish.html',
      controller: 'SurveyFinishController',
      controllerAs: 'sfc'
    })
      .when('/survey/details/:hashedId', {
      templateUrl: '/views/surveyDetails.html',
      controller: 'SurveyDetailsController',
      controllerAs: 'sdc'
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
      .when('/survey/new/finish/:hashedId', {
      templateUrl: '/views/surveyCustomizationFinish.html',
      controller: 'SurveyCustomizationFinishController',
      controllerAs: 'scfc'
    })
      .when('/user/notifications', {
      templateUrl: '/views/notifications.html',
    })
      .otherwise({
      redirectTo:'/'
    });
  }

}());
