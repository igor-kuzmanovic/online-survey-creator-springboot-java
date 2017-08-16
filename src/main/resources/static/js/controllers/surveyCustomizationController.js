(function(){
  angular.module('app')
    .controller('SurveyCustomizationController', SurveyCustomizationController);

  SurveyCustomizationController.$inject = ['SurveyService', 'QuestionService', 'AnswerService', '$location', '$routeParams'];

  function SurveyCustomizationController(SurveyService, QuestionService, AnswerService, $location, $routeParams) {

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
          self.survey = response;
        }, 
        function(error){
          console.log(error);
        })
    }

    function finishCustomization() {
      if(self.survey.questions) {
        for(i = 0; i < self.survey.questions.length; i++){
          if(!(self.survey.questions[i].content && self.survey.questions[i].content.length > 0)){
            QuestionService.deleteQuestion(self.survey.questions[i].id);
            self.survey.questions.splice(i, 1);
          }
        }

        for(i = 0; i < self.survey.questions.length; i++){
          if(self.survey.questions[i].answers) {
            for(j = 0; j < self.survey.questions[i].answers.length; j++) {
              if(!(self.survey.questions[i].answers[j].content && self.survey.questions[i].answers[j].content.length > 0)) {
                AnswerService.deleteAnswer(self.survey.questions[i].answers[j].id);
                self.survey.questions[i].answers.splice(j, 1);
              }
            }
          } 
        }
      }
      
      SurveyService.saveSurvey(self.survey)
        .then(
        function(response){
          var location = $location.path().replace("new", "new/finish");
          $location.path(location);  
        }, 
        function(error){
          console.log(error);
        })
    }

    function createQuestion() {
      self.survey.questions.push({answers:[]});
      self.saveSurvey();
    }

    function deleteQuestion(questionIndex, surveyId, questionId) {
      QuestionService.deleteQuestion(questionId);
      self.survey.questions.splice(questionIndex, 1);
      self.saveSurvey();
    }

    function createAnswer(questionIndex) {
      self.survey.questions[questionIndex].answers.push({});
      self.saveSurvey();
    }

    function deleteAnswer(questionIndex, answerIndex, questionId, answerId) {
      AnswerService.deleteAnswer(answerId);
      self.survey.questions[questionIndex].answers.splice(answerIndex, 1);
      self.saveSurvey();
    }

  };
})();