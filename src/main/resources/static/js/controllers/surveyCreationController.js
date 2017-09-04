(function(){
	angular.module('app')
		.controller('SurveyCreationController', SurveyCreationController);

	SurveyCreationController.$inject = ['SurveyService', '$location', '$scope'];

	function SurveyCreationController(SurveyService, $location, $scope) {

		var self = this;
		self.generateSurvey = generateSurvey;
    
		init();

		function init() {
			if (!$scope.mc.checkUser()) {
				$location.path('/');
			}
		}

		function generateSurvey(survey) {
			if(!checkForm()){
				return;
			}

			SurveyService.generateSurvey(angular.copy(survey))
				.then(
				function(response){
					$location.path('/survey/new/' + response.hashedId);
				}, 
				function(error){
					console.log(error);
          self.error = error;
				})
		}

		function checkForm() {
			var focusedElement;

			if(self.surveyForm.$invalid) {
				if(self.surveyForm.description.$invalid) {
					self.surveyForm.description.$setDirty();
					focusedElement = '#description';
				}

				if(self.surveyForm.name.$invalid) {
					self.surveyForm.name.$setDirty();
					focusedElement = '#name';
				}

				$(focusedElement).focus();

				return false;
			}

			return true;
		}

	}
})();