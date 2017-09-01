(function () {
  angular.module('app')
    .controller('SurveyController', SurveyController);

  SurveyController.$inject = ['SurveyService', 'ResultService', 'NotificationService', '$routeParams', '$location', '$scope'];

  function SurveyController(SurveyService, ResultService, NotificationService, $routeParams, $location, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.submitSurvey = submitSurvey;
    self.postNotification = postNotification;
    
    self.user = {};
    
    init();

    function init() {
      self.user = $scope.mc.checkUser();
      self.surveyHashedId = $routeParams.hashedId;
      getCurrentSurvey();
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
          checkSurvey();
        });
    }
    
    function checkSurvey() {
      if(self.survey.isActive) {
        if(self.user && self.survey.creator === self.user.username) {
          window.alert("You cannot complete your own survey!");
          $location.path('/home');
        }
        checkSubmitter();
      }
      else {
        window.alert("This survey is not active!");
        $location.path('/home');
      }
    }

    function checkSubmitter() {
      if(self.user) {
        ResultService.getSurveyResults(self.survey.id)
          .then(
          function(response){
            for(i = 0; i < response.length; i++) {
              if(response[i].submitedBy === self.user.username) {
                window.alert("You have already completed this survey!");
                $location.path('/home');
              }           
            }
            
            initiateSurveyResult(self.user.username);
          });
      }
      else {
        initiateSurveyResult();
      }
    }

    function initiateSurveyResult(submitter) {
      self.surveyResult = [];
      self.surveyResult = {
        submitedBy: submitter || "anonymous",
        results: []
      };

      for(i = 0; i < self.survey.questions.length; i++) {
        self.surveyResult.results.push({
          questionId: self.survey.questions[i],
          answerId: {}
        })
      }
    }
    
    function postNotification() {
      NotificationService.postSurveyNotification(self.survey, self.notification)
        .then(
        function(response) {
        console.log("success")
      }, function(error){
        console.log(error);
      })
    }
    
    function submitSurvey() { 
      ResultService.submitSurvey(self.survey.id, angular.copy(self.surveyResult))
        .then(
        function(response){
          postNotification();
          $location.path('/survey/finish/' + self.surveyHashedId);
        }, 
        function(error){
          console.log(error);
        })
    }

  };
})();