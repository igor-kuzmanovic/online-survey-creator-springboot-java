(function(){
  angular.module('app')
    .controller('SurveyCustomizationController', SurveyCustomizationController);

  SurveyCustomizationController.$inject = ['QuestionService', 'AnswerService', '$location'];

  function SurveyCustomizationController(QuestionService, AnswerService, $location) {

    this.saveQuestionsAnswers = saveQuestionsAnswers;
    this.createNewQuestion = createNewQuestion;
    this.createNewAnswer = createNewAnswer;    

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
          content: "",
          positionInSurvey: newQuestionPosition
        };

        this.questionList.push(newQuestion);
      };

      console.log(this.questionList);
    };

    function createNewAnswer(questionPosition) {
      if (!this.questionList[questionPosition].answerList) {
        this.questionList[questionPosition].answerList = [];
      };

      if (this.questionList[questionPosition].answerList.length < 10) {
        var newAnswerPosition = this.questionList[questionPosition].answerList.length + 1;
        var newAnswer = {
          content: "",
          positionInQuestion: newAnswerPosition
        };

        this.questionList[questionPosition].answerList.push(newAnswer);
      };
    };

  };
})();