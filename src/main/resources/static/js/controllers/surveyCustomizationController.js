(function(){
  angular.module('app')
    .controller('SurveyCustomizationController', SurveyCustomizationController);

  SurveyCustomizationController.$inject = ['SurveyService', 'QuestionService', 'AnswerService', '$location', '$routeParams'];

  function SurveyCustomizationController(SurveyService, QuestionService, AnswerService, $location, $routeParams) {

    var self = this;
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

    function saveSurvey() {
      SurveyService.saveSurvey(self.survey)
        .then(
        function(response){
          self.survey = response;
        }, 
        function(error){
          console.log(error);
        })
      
      var location = $location.path().replace("new", "new/finish");
      $location.path(location);
    }

    function createQuestion(surveyId) {
      if (!self.survey.questions) {
        self.survey.questions = [];
      }

      if (self.survey.questions.length < 10) {
        var newQuestion = {
          answers: []
        };
        newQuestion = self.saveQuestion(surveyId, newQuestion);
        self.survey.questions.push(newQuestion);
      }
    }

    function saveQuestion(surveyId, question) {
      var returnQuestion = {};

      QuestionService.saveQuestion(surveyId, question)
        .then(
        function(response){
          angular.copy(response, returnQuestion);
        }, 
        function(error){
          console.log(error);
        })

      return returnQuestion;
    }

    function deleteQuestion(question) {
      QuestionService.deleteQuestion(question.id)
        .then(
        function(response){
          getCurrentSurvey();
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
        var newAnswer = self.saveAnswer(questionId, {});
        self.survey.questions[questionPositionInSurvey].answers.push(newAnswer);
      }
    }

    function saveAnswer(questionPosition, answer) {
      var returnAnswer = {};

      AnswerService.saveAnswer(questionPosition, answer)
        .then(
        function(response){
          angular.copy(response, returnAnswer);

        }, 
        function(error){
          console.log(error);
        })

      return returnAnswer;
    }

    function deleteAnswer(answer) {
      AnswerService.deleteAnswer(answer.id)
        .then(
        function(response){
          getCurrentSurvey();
        }, 
        function(error){
          console.log(error);
        })
    }

  };
})();