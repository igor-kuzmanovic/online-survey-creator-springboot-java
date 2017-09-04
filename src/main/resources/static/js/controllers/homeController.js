(function () {
	angular.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['SurveyService', '$scope', '$location'];

	function HomeController(SurveyService, $scope, $location) {

		var self = this;
		self.deleteSurvey = deleteSurvey;
		self.setCurrentSurvey = setCurrentSurvey;
		self.facebookShare = facebookShare;
		self.deactivateSurvey = deactivateSurvey;
		self.toggleSurveyPrivacy = toggleSurveyPrivacy;

		self.facebookLink = [];
		self.twitterLink = [];
		self.googleLink = [];

		init();

		function init(){
			if (!$scope.mc.checkUser()) {
				$location.path('/');
			}

			getUserSurveys();			
		}

		function getUserSurveys(){
			SurveyService.getUserSurveys()
				.then(
				function(response) {
					self.surveys = response;
				}, 
				function(error){
					console.log(error);
					alert(error);				
				})
		}

		function setCurrentSurvey(survey) {
			self.currentSurvey = survey;
		}

		function deleteSurvey() {
			SurveyService.deleteSurvey(self.currentSurvey.id)
				.then(
				function(response) {
					$('#deleteSurveyModal').modal('hide');
					getUserSurveys();
				}, 
				function(error){
					console.log(error);
					alert(error);
				})
		}

		function facebookShare(id) {
			var facebookHref = 'https://tech9survey.github.io/#/' + id + '/';

			FB.ui({
				method: 'share',
				display: 'popup',
				href: facebookHref,
			}, function(response){});
		}

		function deactivateSurvey() {
			SurveyService.deactivateSurvey(self.currentSurvey.id)
				.then(
				function(response){
					getUserSurveys();
				}, 
				function(error){
					console.log(error);
					alert(error);				
				})
		}

		function toggleSurveyPrivacy() {
			SurveyService.toggleSurveyPrivacy(self.currentSurvey.id)
				.then(
				function(response){
					getUserSurveys();
				}, 
				function(error){
					console.log(error);
					alert(error);				
				})
		}
	};
})();
