(function() {
	angular.module('app')
		.controller('SurveyController', SurveyController);
	
	SurveyController.$inject = ['SurveyService'];
	
	function SurveyController(SurveyService) {
		
	};	
});()