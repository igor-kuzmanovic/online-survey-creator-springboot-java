(function(){
  angular.module('app')
    .controller('SurveyCustomizationController', SurveyCustomizationController);

  SurveyCustomizationController.$inject = ['SurveyService', 'QuestionService', 'AnswerService', '$location', '$routeParams'];

  function SurveyCustomizationController(SurveyService, QuestionService, AnswerService, $location, $routeParams) {

    var scc = this;
    scc.saveQuestions = saveQuestions;
    scc.createNewQuestion = createNewQuestion;
    scc.createNewAnswer = createNewAnswer;

    init();

    function init() {
      scc.surveyHashedId = $routeParams.hashedId;
      SurveyService.getCurrentSurvey(scc.surveyHashedId)
        .then(
        function(response){
          scc.survey = response;
        });
    }

    function saveQuestions() {

      var location = $location.path().replace("new", "new/finish");
      $location.path(location);
    };

    function createNewQuestion() {
      if (!scc.questionList) {
        scc.questionList = [];
      }

      if (scc.questionList.length < 10) {
        var newQuestionPosition = scc.questionList.length + 1;
        var newQuestion = {
          content: "",
          positionInSurvey: newQuestionPosition
        };

        scc.questionList.push(newQuestion);
      };
    };

    function createNewAnswer(questionId) {
      if (!scc.questionList[questionId].answerList) {
        scc.questionList[questionId].answerList = [];
      };

      if (scc.questionList[questionId].answerList.length < 10) {
        var newAnswerPosition = scc.questionList[questionId].answerList.length + 1;
        var newAnswer = {
          content: "",
          positionInQuestion: newAnswerPosition
        };

        scc.questionList[questionId].answerList.push(newAnswer);
      };
    };

  };
})();