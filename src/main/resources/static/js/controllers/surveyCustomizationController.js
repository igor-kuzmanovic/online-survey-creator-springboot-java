(function(){
  angular.module('app')
    .controller('SurveyCustomizationController', SurveyCustomizationController);

  SurveyCustomizationController.$inject = ['SurveyService', 'QuestionService', 'AnswerService', '$location', '$routeParams', '$scope'];

  function SurveyCustomizationController(SurveyService, QuestionService, AnswerService, $location, $routeParams, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.saveSurvey = saveSurvey;
    self.finishCustomization = finishCustomization;
    self.createQuestion = createQuestion;
    self.deleteQuestion = deleteQuestion;
    self.createAnswer = createAnswer;
    self.deleteAnswer = deleteAnswer;

    init();

    function init() {
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }
      else {
        self.surveyHashedId = $routeParams.hashedId;
        getCurrentSurvey();
      }
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
        },
        function(error){
          console.log(error);
          self.initError = error;
        });
    }

    function saveSurvey() {
      SurveyService.saveSurvey(angular.copy(self.survey))
        .then(
        function(response){
          self.survey = response;
        }, 
        function(error){
          console.log(error);
          self.error = error;
        })
    }

    function finishCustomization() {
      var survey = angular.copy(self.survey);

      if(survey.questions) {
        for(i = 0; i < survey.questions.length; i++){
          if(!(survey.questions[i].content && survey.questions[i].content.length > 0)){
            QuestionService.deleteQuestion(survey.questions[i].id)
              .then(
              function(response){}, 
              function(error){
                console.log(error);
                self.error = error;
              });

            survey.questions.splice(i, 1);
          }
        }

        for(i = 0; i < survey.questions.length; i++){
          if(survey.questions[i].answers) {
            for(j = 0; j < survey.questions[i].answers.length; j++) {
              if(!(survey.questions[i].answers[j].content && survey.questions[i].answers[j].content.length > 0)) {
                AnswerService.deleteAnswer(survey.questions[i].answers[j].id)
                  .then(
                  function(response){}, 
                  function(error){
                    console.log(error);
                    self.error = error;
                  });

                survey.questions[i].answers.splice(j, 1);
              }
            }
          } 
        }
      }

      SurveyService.saveSurvey(angular.copy(survey))
        .then(
        function(response){ 
          $location.path('/survey/new/finish/' + self.surveyHashedId);
        }, 
        function(error){
          console.log(error);
          self.error = error;
        })
    }

    function createQuestion() {
      self.survey.questions.push({answers:[]});
      self.saveSurvey();
    }

    function deleteQuestion(questionIndex, surveyId, questionId) {
      QuestionService.deleteQuestion(questionId)	
        .then(
        function(response){
          self.survey.questions.splice(questionIndex, 1);
          self.saveSurvey();
        }, 
        function(error){
          console.log(error);
          self.error = error;
        });
    }

    function createAnswer(questionIndex) {
      self.survey.questions[questionIndex].answers.push({});
      self.saveSurvey();
    }

    function deleteAnswer(questionIndex, answerIndex, questionId, answerId) {
      AnswerService.deleteAnswer(answerId)
        .then(
        function(response){
          self.survey.questions[questionIndex].answers.splice(answerIndex, 1);
          self.saveSurvey();
        }, 
        function(error){
          console.log(error);
          self.error = error;
        });
    }

  };
})();