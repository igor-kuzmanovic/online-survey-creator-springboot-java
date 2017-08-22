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
      .when('/survey/submit/:hashedId', {
      templateUrl: '/views/survey.html',
      controller: 'SurveyController',
      controllerAs: 'sc'
    })
      .when('/user/settings', {
      templateUrl: '/views/userSettings.html',
      controller: 'UserSettingsController',
      controllerAs: 'usc'
    })
      .when('/user/verify', {
      templateUrl: '/views/verifyUser.html',
      controller: 'VerifyUserController',
      controllerAs: 'vuc'
      })
      .when('/api/users/activate/:token', {
          redirectTo:'/',
          controller: 'ActivateController',
          controllerAs: 'ac'
      })
      .when('/user/notifications', {
      templateUrl: '/views/notifications.html',
    })
      .otherwise({
      redirectTo:'/'
    });
  }
}());
