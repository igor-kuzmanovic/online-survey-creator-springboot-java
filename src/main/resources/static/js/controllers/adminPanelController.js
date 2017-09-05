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
    self.setCurrentSurvey = setCurrentSurvey;
    self.removeSurvey = removeSurvey;
    self.allowSurvey = allowSurvey;
    self.setCurrentComment = setCurrentComment;
    self.removeComment = removeComment;
    self.allowComment = allowComment;
    self.setCurrentAnswer = setCurrentAnswer;
    self.removeAnswer = removeAnswer;
    self.setCurrentQuestion = setCurrentQuestion;
    self.removeQuestion = removeQuestion;
    self.setCurrentUser = setCurrentUser;

    self.banDays = "7";
    self.allComments = [];
    self.allQuestions = [];
    self.allAnswers = [];

    init();
    
    function init() {
      getAllSurveys();
      getAllUsers();

    }
    
    function setCurrentUser(user) {
        self.currentUser = user;
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
    
    function blockUser(user) {
        if(user) {
           self.currentUser = user;
        }

        for(var i = 0; i < self.currentUser.roles.length; i++) {
            if(self.currentUser.roles[i].type === 'ROLE_ADMIN') {
                self.isAdmin = true;
            }
        }

        if(self.isAdmin) {
            console.log("Can't ban admin!");
            $('#banUserModal').modal('hide');
            return;
        }

        UserService.toggleUserBlock(self.currentUser.id, self.banDays).then(function (data, status) {
            $('#banUserModal').modal('hide');
            getAllUsers();
        });
    }
    
    function removeUser(id) {
        UserService.deleteUser(id).then(function (data, status) {
            alert("User deleted");
            getAllUsers();
        });
    }
    
        
    function setCurrentSurvey(survey) {
      self.currentSurvey = survey;
    }

    function removeSurvey() {
      SurveyService.deleteSurvey(self.currentSurvey.id)
        .then(
        function(response) {
          $('#removeSurveyModal').modal('hide');
          getAllSurveys();
        }, 
        function(error){
          console.log(error);
          self.error = error;
        })
    }
    
    function allowSurvey() {
       SurveyService.allowSurvey(self.currentSurvey.id)
      .then(
        function(response) {
          $('#allowSurveyModal').modal('hide');
          getAllSurveys();
        }, 
        function(error){
          console.log(error);
          self.error = error;
        })
    }
    
    function setCurrentComment(comment) {
      self.currentComment = comment;
    }
    
    function removeComment() {
      CommentService.deleteComment(self.currentComment.id)
        .then(
        function(response) {
          $('#removeCommentModal').modal('hide');
          getAllSurveys();
        }, 
        function(error){
          console.log(error);
          self.error = error;
        })
    }
    
    function allowComment() {
       CommentService.allowComment(self.currentComment.id)
      .then(
        function(response) {
          $('#allowCommentModal').modal('hide');
          getAllSurveys();
        }, 
        function(error){
          console.log(error);
          self.error = error;
        })
    }
    
    function setCurrentQuestion(question) {
      self.currentQuestion = question;
    }
    
    function removeQuestion() {
      QuestionService.deleteQuestion(self.currentQuestion.id)
        .then(
        function(response) {
          $('#removeQuestionModal').modal('hide');
          getAllSurveys();
        }, 
        function(error){
          console.log(error);
          self.error = error;
        })
    }
    
    function setCurrentAnswer(answer) {
      self.currentAnswer = answer;
    }
    
    function removeAnswer() {
      AnswerService.deleteAnswer(self.currentAnswer.id)
        .then(
        function(response) {
          $('#removeAnswerModal').modal('hide');
          getAllSurveys();
        }, 
        function(error){
          console.log(error);
          self.error = error;
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