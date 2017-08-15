(function(){
  angular.module('app')
    .controller('SurveyCustomizationController', SurveyCustomizationController);

  SurveyCustomizationController.$inject = ['SurveyService', 'QuestionService', 'AnswerService', '$location', '$routeParams'];

  function SurveyCustomizationController(SurveyService, QuestionService, AnswerService, $location, $routeParams) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.finishCustomization = finishCustomization;
    self.saveSurvey = saveSurvey;
    self.createQuestion = createQuestion;
    self.saveQuestion = saveQuestion;
    self.deleteQuestion = deleteQuestion;
    self.createAnswer = createAnswer;
    self.saveAnswer = saveAnswer;
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
    
    function finishCustomization() {
      self.saveSurvey();
      var location = $location.path().replace("new", "new/finish");
      $location.path(location);      
    }

    function saveSurvey() {
      SurveyService.saveSurvey(self.survey)
        .then(
        function(response){
          self.survey = response;
          console.log(self.survey);
        }, 
        function(error){
          console.log(error);
        })
    }

    function createQuestion(surveyId) {
      if (!self.survey.questions) {
        self.survey.questions = [];
      }

      if (self.survey.questions.length < 10) {
        var question = {
          answers: []
        };
        
        self.saveQuestion(surveyId, question);
      }
    }

    function saveQuestion(surveyId, question) {
      self.saveSurvey();
      
      QuestionService.saveQuestion(surveyId, question)
        .then(
        function(response){
          self.getCurrentSurvey();
        }, 
        function(error){
          console.log(error);
        })
    }

    function deleteQuestion(surveyId, question) {
      self.saveSurvey();
      
      QuestionService.deleteQuestion(surveyId, question.id)
        .then(
        function(response){
          self.getCurrentSurvey();
        }, 
        function(error){
          console.log(error);
        })
    }

    function createAnswer(questionPositionInSurvey, questionId) {
      if (!self.survey.questions[questionPositionInSurvey].answers) {
        self.survey.questions[questionPositionInSurvey].answers = [];
      }

      if (self.survey.questions[questionPositionInSurvey].answers.length < 10) {
        var answer = {
          
        };
        
        self.saveAnswer(questionId, answer);
      }
    }

    function saveAnswer(questionPosition, answer) {
      self.saveSurvey();
      
      AnswerService.saveAnswer(questionPosition, answer)
        .then(
        function(response){
          self.getCurrentSurvey();

        }, 
        function(error){
          console.log(error);
        })
    }

    function deleteAnswer(questionId, answer) {
      self.saveSurvey();
      
      AnswerService.deleteAnswer(questionId, answer.id)
        .then(
        function(response){
          self.getCurrentSurvey();
        }, 
        function(error){
          console.log(error);
        })
    }

  };
})();