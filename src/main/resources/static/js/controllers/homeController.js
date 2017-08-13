(function () {
	angular.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['SurveyService', 'UserService', '$location'];

	function HomeController(SurveyService, UserService, $location) {

		var self = this;

		init();
		getSurveys();

		function init(){
			var user = UserService.getUser();
			if(!user) {
				$location.url('/');
			}
			getSurveys();
		}

		function getSurveys(){
			SurveyService.getSurveys().then(handleSuccessSurveys);
		}

		function handleSuccessSurveys(data, status) {
			self.surveys = data;
		}

	};
})();
