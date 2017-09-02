(function () {
	angular.module('app')
		.controller('SurveyController', SurveyController);

	SurveyController.$inject = ['SurveyService', 'ResultService', '$routeParams', '$location', '$scope'];

	function SurveyController(SurveyService, ResultService, $routeParams, $location, $scope) {

		var self = this;
		self.getCurrentSurvey = getCurrentSurvey;
		self.submitSurvey = submitSurvey;

		self.user = {};

		init();

		function init() {
			$scope.mc.getImage();
			self.user = $scope.mc.checkUser();
			self.surveyHashedId = $routeParams.hashedId;
			getCurrentSurvey();
		}

		function getCurrentSurvey() {
			SurveyService.getCurrentSurvey(self.surveyHashedId)
				.then(
				function(response){
					self.survey = response;
					checkSurvey();
				}, 
				function(error){
					console.log(error);
					alert(error);          
				});
		}

		function checkSurvey() {
			if(self.survey.isActive) {
				if(self.user && self.survey.creator === self.user.username) {
					console.log('You cannot complete your own survey!');
					alert('You cannot complete your own survey!');
					$location.path('/home');
				}

				if(!self.user && !self.survey.isPublic) {
					console.log("This survey isn't open for unregistered users!")
					alert("This survey isn't open for unregistered users!");
					$location.path('/');
				}

				checkSubmitter();
			}
			else {
				console.log("This survey is not active!");
				alert("This survey is not active!");
				$location.path('/survey/results/' + self.surveyHashedId);
			}
		}

		function checkSubmitter() {
			if(self.user) {
				ResultService.getSurveyResults(self.survey.id)
					.then(
					function(response){
						for(i = 0; i < response.length; i++) {
							if(response[i].submitedBy === self.user.username) {
								console.log("You have already completed this survey!");
								alert("You have already completed this survey!");
								$location.path('/home');
							}           
						}

						initiateSurveyResult(self.user.username);
					}, 
					function(error){
						console.log(error);
						alert(error);          
					});
			}
			else {
				initiateSurveyResult();
			}
		}

		function initiateSurveyResult(submitter) {
			self.surveyResult = [];
			self.surveyResult = {
				submitedBy: submitter || "anonymous",
				results: []
			};

			for(i = 0; i < self.survey.questions.length; i++) {
				self.surveyResult.results.push({
					questionId: self.survey.questions[i],
					answerId: {}
				})
			}
		}

		function submitSurvey() { 
			ResultService.submitSurvey(self.survey.id, angular.copy(self.surveyResult))
				.then(
				function(response){
					$location.path('/survey/finish/' + self.surveyHashedId);
				}, 
				function(error){
					console.log(error);
					alert(error);          
				});
		}

	};
})();