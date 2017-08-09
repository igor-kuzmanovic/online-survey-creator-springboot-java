(function(){
  angular.module('app')
    .controller('SurveyCreationController', SurveyCreationController);

  SurveyCreationController.$inject = ['SurveyService', '$location'];

  function SurveyCreationController(SurveyService, $location) {

		this.generateSurvey = generateSurvey;

    function generateSurvey(survey) {
      SurveyService.generateSurvey(survey)
        .then(
        function(response){
          $location.path('/survey/new/' + response.hashedId);
      }, 
        function(error){
          console.log(error);
      })
    }  

  };
})();