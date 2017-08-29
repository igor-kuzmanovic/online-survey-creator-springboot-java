(function () {
  angular.module('app')
    .controller('AdminPanelController', AdminPanelController);

  AdminPanelController.$inject = ['SurveyService', 'UserService', 'CommentService', 'QuestionService', '$scope'];

  function AdminPanelController(SurveyService, UserService, CommentService, QuestionService, $scope) {

    var self = this;
    self.active = "users";
    self.menuSelected = menuSelected;

    init();
    
    function init() {
      getAllSurveys();
      getAllUsers();
      getAllComments();
      getAllQuestions();
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
    }
    
    function getAllQuestions() {
        QuestionService.findAllQuestions().then(handleSuccessQuestions)
    }
    
    function handleSuccessQuestions(data, status) {
        self.questions = data;
        for(var i = 0; i < self.questions.length; i++) {
            SurveyService.getSurveyByQuestion(self.questions[i].id).then(function(response){

            })
        }
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