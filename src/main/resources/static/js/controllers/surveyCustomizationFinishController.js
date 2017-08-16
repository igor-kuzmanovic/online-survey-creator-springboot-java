(function(){
  angular.module('app')
    .controller('SurveyCustomizationFinishController', SurveyCustomizationFinishController);

  SurveyCustomizationFinishController.$inject = ['SurveyService', '$location', '$routeParams'];

  function SurveyCustomizationFinishController(SurveyService, $location, $routeParams) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.saveSurvey = saveSurvey;

    init();

    function init() {
      self.surveyHashedId = $routeParams.hashedId;
      getCurrentSurvey();
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
        });
    }

    function saveSurvey() {
      SurveyService.saveSurvey(self.survey)
        .then(
        function(response){
          $location.path('/survey/details/' + response.hashedId);
        }, 
        function(error){
          console.log(error);
        })
    }

  };
})();