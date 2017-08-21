(function(){
  angular.module('app')
    .controller('SurveyCustomizationFinishController', SurveyCustomizationFinishController);

  SurveyCustomizationFinishController.$inject = ['SurveyService', '$location', '$routeParams', '$filter'];

  function SurveyCustomizationFinishController(SurveyService, $location, $routeParams, $filter) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.saveSurvey = saveSurvey;
    
    init()
    
    function init() {
      self.surveyHashedId = $routeParams.hashedId;
      getCurrentSurvey();
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
          self.survey.publicationDate = new Date();
          self.survey.expirationDate = new Date();
          self.surveyInput = self.survey;
        }, 
        function(error){
          console.log(error);
        })
    }

    function saveSurvey() {
      SurveyService.saveSurvey(angular.copy(self.surveyInput))
        .then(
        function(response){
          $location.path('/survey/submit/' + response.hashedId);
        }, 
        function(error){
          console.log(error);
        })
    }

  };
})();