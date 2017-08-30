(function () {
  angular.module('app')
    .controller('AdminPanelController', AdminPanelController);

  AdminPanelController.$inject = ['SurveyService', 'UserService', 'CommentService', 'QuestionService', 'AnswerService', '$scope'];

  function AdminPanelController(SurveyService, UserService, CommentService, QuestionService, AnswerService, $scope) {

    var self = this;
    self.active = "users";
    self.menuSelected = menuSelected;
    self.removeUser = removeUser;
    self.blockUser = blockUser;
    self.removeSurvey = removeSurvey;
    self.removeComment = removeComment;
    self.removeAnswer = removeAnswer;
    self.removeQuestion = removeQuestion;
    self.allComments = [];
    self.allQuestions = [];
    self.allAnswers = [];

    init();
    
    function init() {
      getAllSurveys();
      getAllUsers();
    }
    
    function getAllSurveys() {
        SurveyService.getSurveys().then(handleSuccessSurveys);
    }
    
    function handleSuccessSurveys(data, status) {
        self.surveys = data;
        getAllComments();
        getAllQuestions();
        getAllAnswers();
    }
    
    function getAllUsers() {
        UserService.findAllUsers().then(handleSuccessUsers);
    }
    
    function handleSuccessUsers(data, status) {
        self.users = data;
    }
    
    function getAllComments() {
        self.allComments = [];
        for(var i = 0; i < self.surveys.length; i++) {
            for(var j = 0; j < self.surveys[i].comments.length; j++) {
                self.surveys[i].comments[j].survey = self.surveys[i].name;
                self.allComments.push(self.surveys[i].comments[j]);
            }
        }
    }
    
    function getAllQuestions() {
        self.allQuestions = [];
        for(var i = 0; i < self.surveys.length; i++) {
            for(var j = 0; j < self.surveys[i].questions.length; j++) {
                self.surveys[i].questions[j].survey = self.surveys[i].name;
                self.allQuestions.push(self.surveys[i].questions[j]);
            }
        }
    }
    
    function getAllAnswers() {
        self.allAnswers = [];
        for(var i = 0; i < self.surveys.length; i++) {
            for(var j = 0; j < self.surveys[i].questions.length; j++) {
                for(var k = 0; k < self.surveys[i].questions[j].answers.length; k++) {
                    self.surveys[i].questions[j].answers[k].question = self.surveys[i].questions[j].content;
                    self.allAnswers.push(self.surveys[i].questions[j].answers[k]);
                }
            }
        }
    }
    
    function blockUser(id) {
        UserService.toggleUserBlock(id).then(function (data, status) {
            alert("User blocked/unblocked");
        });
    }
    
    function removeUser(id) {
        UserService.deleteUser(id).then(function (data, status) {
            alert("User deleted");
            getAllUsers();
        });
    }

    function removeSurvey(id) {
        SurveyService.deleteSurvey(id).then(function (data, status) {
            alert("Survey removed");
            getAllSurveys();
        });
    }
    
    function removeComment(id) {
        CommentService.deleteComment(id).then(function (data, status) {
            alert("Comment removed");
            getAllSurveys();
        });
    }
    
    function removeQuestion(id) {
        QuestionService.deleteQuestion(id).then(function (data, status) {
           alert("Question deleted!");
           getAllSurveys();
        });
    }
    
    function removeAnswer(id) {
        AnswerService.deleteAnswer(id).then(function (data, status) {
            alert("Answer deleted");
            getAllSurveys();
        });
    }
    
    function menuSelected(menu) {
        switch(menu) {
            case 'users':
                self.active = 'users';
                break;
            case 'surveys':
                self.active = 'surveys';
                break;
            case 'answers':
                self.active = 'answers';
                break;
            case 'questions':
                self.active = 'questions';
                break;
            case 'comments':
                self.active = 'comments';
                break;
        }
    }

  }
})();