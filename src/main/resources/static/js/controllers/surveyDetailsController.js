(function(){
  angular.module('app')
   .controller('SurveyDetailsController', SurveyDetailsController);
  
  SurveyDetailsController.$inject = ['SurveyService','ResultService', '$routeParams', '$location', '$scope'];
  
  function SurveyDetailsController(SurveyService, ResultService, $routeParams, $location, $scope) {
    
    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;

    init();

    function init() {
      $scope.mc.checkUser();
      self.surveyHashedId = $routeParams.hashedId;
      getCurrentSurvey();
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
          initiateSurveyResult();
        });
    }
    
    function initiateSurveyResult() {
      self.surveyResult = [];
      self.surveyResult = {
        submitedBy: "user",
        results: []
      };
      
      for(i = 0; i < self.survey.questions.length; i++) {
        self.surveyResult.results.push({
          questionId: self.survey.questions[i],
          answerId: {}
        })
      }
    }    
  };
})();