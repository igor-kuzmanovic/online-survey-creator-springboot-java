(function () {
  angular.module('app')
    .controller('SurveyResponsesController', SurveyResponsesController);

  SurveyResponsesController.$inject = ['SurveyService', '$routeParams'];

  function SurveyResponsesController(SurveyService, $routeParams) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.getSurveyComments = getSurveyComments;
    
    init();

    function init() {
      self.surveyHashedId = $routeParams.hashedId;
      self.comment = {};
      getCurrentSurvey();
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
          getSurveyComments();
        })
    }
    function getSurveyComments() {
      SurveyService.getSurveyComments(self.survey).then(handleSuccessSurveyComments);
    }
    
    function handleSuccessSurveyComments(data, status) {
      self.comments = data;
    }
    
  };
})();