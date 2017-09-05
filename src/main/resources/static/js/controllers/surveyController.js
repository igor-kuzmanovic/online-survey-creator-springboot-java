(function () {
  angular.module('app')
    .controller('SurveyController', SurveyController);

  SurveyController.$inject = ['CaptchaService', 'SurveyService', 'ResultService', 'NotificationService', '$routeParams', '$location', '$scope'];

  function SurveyController(CaptchaService, SurveyService, ResultService, NotificationService, $routeParams, $location, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.submitSurvey = submitSurvey;
    self.reportSurvey = reportSurvey;

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
        }, 
        function(error){
          console.log(error);
          self.error = error;
        });
    }

    function checkSurvey() {
      if(self.survey.isActive) {
        if(self.user && self.survey.creator === self.user.username) {
          console.log('You cannot complete your own survey!');
          self.initError = 'You cannot complete your own survey!';
        }

        if(!self.user && !self.survey.isPublic) {
          console.log("This survey isn't open for unregistered users!");
          self.initError = "This survey isn't open for unregistered users!";
        }

        checkSubmitter();
      }
      else {
        $location.path('/survey/results/' + self.surveyHashedId);
      }
    }

    function checkSubmitter() {
      if(self.user) {
        ResultService.getSurveyResults(self.survey.id)
          .then(
          function(response){
            for(i = 0; i < response.length; i++) {
              if(response[i].submitedBy === self.user.username) {
                console.log("You have already completed this survey!");
                self.initError = "You have already completed this survey!";
              }           
            }

            initiateSurveyResult();
          }, 
          function(error){
            console.log(error);     
            self.error = error;
          });
      }
      else {
        initiateSurveyResult();
      }
    }

    function initiateSurveyResult() {
      self.surveyResult = [];
      self.surveyResult = {
        results: []
      };

      for(i = 0; i < self.survey.questions.length; i++) {
        if(self.survey.questions[i].hasOtherOption) {
          self.surveyResult.results.push({
            questionId: self.survey.questions[i].id,
            answerId: 0,
            optional: ''
          })
        }
        else {
          self.surveyResult.results.push({
            questionId: self.survey.questions[i].id,
            answerId: self.survey.questions[i].answers[0].id,
            optional: ''
          })
        }
      }

      renderCaptcha();
    }

    function renderCaptcha() {
      self.recaptchaId = grecaptcha.render('captcha-survey', {
        'sitekey' : '6LfO0SwUAAAAAI73tCuECJHe4MRpJyHQQUbH1RdZ'
      });
    }

    function submitSurvey() {
      self.captchaResponse = grecaptcha.getResponse(self.recaptchaId);

      if(!self.captchaResponse) {
        console.log("Please complete the captcha!");
        self.error = "Please complete the captcha!";
        return;
      }

      CaptchaService.sendCaptchaResponse(self.captchaResponse)
        .then(
        function(response){
          ResultService.submitSurvey(self.survey.id, angular.copy(self.surveyResult))
            .then(
            function(response){
              postNotification();
              $location.path('/survey/finish/' + self.surveyHashedId);
            }, 
            function(error){
              console.log(error);
              self.error = error;
            });
        },
        function(error){
          console.log(error);
          self.error = error;
        });
    }

    function postNotification() {
      NotificationService.postSurveyNotification(self.survey)
        .then(
        function(response) {}, function(error){
          console.log(error);
          self.error = error;
        })
    }

    function reportSurvey() {
      NotificationService.reportSurveyNotification(self.survey)
        .then(function(response){}, function(error){
        console.log(error);
        self.error = error;
      })
    }

  };
})();