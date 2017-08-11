(function(){
  angular.module('app')
    .controller('SurveyCustomizationController', SurveyCustomizationController);

  SurveyCustomizationController.$inject = ['QuestionService', 'AnswerService', '$location', '$routeParams'];

  function SurveyCustomizationController(QuestionService, AnswerService, $location, $routeParams) {

    this.saveQuestionsAnswers = saveQuestionsAnswers;
    this.createNewQuestion = createNewQuestion;
    this.createNewAnswer = createNewAnswer;
    
    this.surveyHashedId = $routeParams.hashedId;   

    function saveQuestionsAnswers() {
      if(this.questionList) {
        for(i = 0; i < this.questionList.length; i++) {
          if(this.questionList[i].answerList) {
            for(j = 0; j < this.questionList[i].answerList.length; j++) {
              AnswerService.saveAnswer(this.questionList[i].answerList[j])
                .then(
                function(response){

                }, 
                function(error){
                  console.log(error);
                })
            };

            QuestionService.saveQuestion(this.questionList[i])
              .then(
              function(response){
                
              }, 
              function(error){
                console.log(error);
              })
          };
        };
        
        var location = $location.path().replace("new", "new/finish");
        $location.path(location);
      };
    };

    function createNewQuestion() {
      if (!this.questionList) {
        this.questionList = [];
      }

      if (this.questionList.length < 10) {
        var newQuestionPosition = this.questionList.length + 1;
        var newQuestion = {
          hashed_id: this.surveyHashedId,
          content: "",
          positionInSurvey: newQuestionPosition
        };

        this.questionList.push(newQuestion);
      };
    };

    function createNewAnswer(questionId) {
      if (!this.questionList[questionId].answerList) {
        this.questionList[questionId].answerList = [];
      };

      if (this.questionList[questionId].answerList.length < 10) {
        var newAnswerPosition = this.questionList[questionId].answerList.length + 1;
        var newAnswer = {
          question_id: questionId,
          content: "",
          positionInQuestion: newAnswerPosition
        };

        this.questionList[questionId].answerList.push(newAnswer);
      };
    };

  };
})();