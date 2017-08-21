(function () {
  angular.module('app')
    .controller('SurveyController', SurveyController);

  SurveyController.$inject = ['SurveyService', 'ResultService', '$routeParams', '$location', '$scope'];

  function SurveyController(SurveyService, ResultService, $routeParams, $location, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.submitSurvey = submitSurvey;

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

    function submitSurvey() { 
      ResultService.submitSurvey(self.survey.id, angular.copy(self.surveyResult))
        .then(
        function(response){
          $location.path('/survey/finish/' + self.surveyHashedId);
        }, 
        function(error){
          console.log(error);
        })
    }

  };
})();