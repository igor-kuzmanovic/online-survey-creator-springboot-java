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
			.when('/user/notifications', {
			templateUrl: '/views/notifications.html',
		})
			.otherwise({
			redirectTo:'/'
		});

		$locationProvider.html5Mode(true);
	}

}());
