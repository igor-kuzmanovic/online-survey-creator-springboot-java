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
            .when('/survey/create/:hashedId', {
                templateUrl: '/views/surveyCreation.html',
                controller: 'SurveyCreationController',
                controllerAs: 'scc'
            })
            .otherwise({
                redirectTo: '/home'
            });

        //$locationProvider.html5Mode(true);
    }

}());