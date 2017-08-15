(function(){
  angular.module('app')
    .controller('SurveyCustomizationController', SurveyCustomizationController);

  SurveyCustomizationController.$inject = ['SurveyService', '$location', '$routeParams'];

  function SurveyCustomizationController(SurveyService, $location, $routeParams) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.finishCustomization = finishCustomization;
    self.saveSurvey = saveSurvey;
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
      self.survey.questions.splice(questionIndex, 1);
      self.saveSurvey();
    }

    function createAnswer(questionIndex) {
      self.survey.questions[questionIndex].answers.push({});
      self.saveSurvey();
    }

    function deleteAnswer(questionIndex, answerIndex, questionId, answerId) {
      self.survey.questions[questionIndex].answers.splice(answerIndex, 1);
      self.saveSurvey();
    }

  };
})();