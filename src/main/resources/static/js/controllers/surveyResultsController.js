(function () {
  angular.module('app')
    .controller('SurveyResultsController', SurveyResultsController);

  SurveyResultsController.$inject = ['SurveyService', '$routeParams', '$scope'];

  function SurveyResultsController(SurveyService, $routeParams, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.getSurveyComments = getSurveyComments;
    
    init();

    function init() {
      $scope.mc.checkUser();
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
    
  }
})();