(function() {
	angular.module('app')
		.controller('SurveyController', SurveyController);
	
	SurveyController.$inject = [SurveyService];
	
	function SurveyController(SurveyService) {
		var vm = this;
		vm.deleteSurvey = deleteSurvey;
		vm.designSurvey = designSurvey;
		
	};	
});()