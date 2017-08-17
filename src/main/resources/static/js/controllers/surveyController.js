(function () {
  angular.module('app')
    .controller('SurveyController', SurveyController);

  SurveyController.$inject = ['SurveyService'];

  function SurveyController(SurveyService) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.submitSurvey = submitSurvey;

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

    function submitSurvey() {
      SurveyService.saveSurvey(angular.copy(self.survey))
        .then(
        function(response){
          $location.path('/survey/finish/' + response.hashedId);
        }, 
        function(error){
          console.log(error);
        })
    }

  };
})();