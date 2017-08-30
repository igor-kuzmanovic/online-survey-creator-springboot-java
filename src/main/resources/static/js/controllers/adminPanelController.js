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
    var j = 0;
    var k = 0;
    var l = 0;

    init();
    
    function init() {
      getAllSurveys();
      getAllUsers();
      getAllComments();
      getAllQuestions();
      getAllAnswers();
    }
    
    function getAllSurveys() {
        SurveyService.getSurveys().then(handleSuccessSurveys);
    }
    
    function handleSuccessSurveys(data, status) {
        self.surveys = data;
    }
    
    function getAllUsers() {
        UserService.findAllUsers().then(handleSuccessUsers);
    }
    
    function handleSuccessUsers(data, status) {
        self.users = data;
    }
    
    function getAllComments() {
        CommentService.findAllComments().then(handleSuccessComments);
    }
    
    function handleSuccessComments(data, status) {
        self.comments = data;
        for(var i = 0; i < self.comments.length; i++) {
            SurveyService.getSurveyByComment(self.comments[i].id).then(handleSuccessSurveyComments);
        }
    }
    
    function handleSuccessSurveyComments(data, status) {
        self.comments[k].survey = data.name;
        k++;
    }
    
    function getAllQuestions() {
        QuestionService.findAllQuestions().then(handleSuccessQuestions)
    }
    
    function handleSuccessQuestions(data, status) {
        self.questions = data;
        for(var i = 0; i < self.questions.length; i++) {
            SurveyService.getSurveyByQuestion(self.questions[i].id).then(handleSuccessSurveyByQuestion);
        }
    }

    function handleSuccessSurveyByQuestion(data, status) {
        self.questions[j].survey = data.name;
        j++;
    }
    
    function getAllAnswers() {
        AnswerService.getAllAnswers().then(handleSuccessAnswers);
    }
    
    function handleSuccessAnswers(data, status) {
        self.answers = data;
        for(var i = 0; i < self.answers.length; i++) {
            QuestionService.getQuestionByAnswer(self.answers[i].id).then(handleSuccessQuestionByAnswer);
        }
    }
    
    function handleSuccessQuestionByAnswer(data, status) {
        self.answers[l].question = data.content;
        l++;
    }
    
    function blockUser(id) {
        UserService.toggleUserBlock(id).then(function (data, status) {
            alert("User blocked");
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
        })
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