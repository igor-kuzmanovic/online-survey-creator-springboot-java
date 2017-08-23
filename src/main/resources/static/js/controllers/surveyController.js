(function () {
  angular.module('app')
    .controller('SurveyController', SurveyController);

  SurveyController.$inject = ['SurveyService', 'ResultService', '$routeParams', '$location', '$scope'];

  function SurveyController(SurveyService, ResultService, $routeParams, $location, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.submitSurvey = submitSurvey;
    self.submitter = "";

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
          checkSubmitter();
        });
    }

    function checkSubmitter() {
      ResultService.getSurveyResults(self.survey.id)
        .then(
        function(response){
          var user = $scope.mc.checkUser()

          if(user) {
            for(i = 0; i < response.length; i++) {
              console.log(response[i].submitedBy + "_" + user.username);
              if(response[i].submitedBy === user.username) {
                $location.path('/home');
              }
            }
            
            self.submitter = user.username;
          }
          else {
            self.submitter = "anonymous";
          }
          
          initiateSurveyResult();
        });
    }

    function initiateSurveyResult() {
      self.surveyResult = [];
      self.surveyResult = {
        submitedBy: self.submitter,
        results: []
      };
      console.log(self.surveyResult);
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