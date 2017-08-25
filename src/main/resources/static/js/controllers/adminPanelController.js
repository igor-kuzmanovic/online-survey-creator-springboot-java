(function () {
  angular.module('app')
    .controller('AdminPanelController', AdminPanelController);

  AdminPanelController.$inject = ['SurveyService', '$scope'];

  function AdminPanelController(SurveyService, $scope) {

    var self = this;
    self.active = "users";
    self.getAllSurveys = getAllSurveys;
    self.usersSelected = usersSelected;
    self.surveysSelected = surveysSelected;
    self.answersSelected = answersSelected;
    self.questionsSelected = questionsSelected;

    init();
    
    function init() {
      getAllSurveys();
    }
    
    function getAllSurveys() {
        SurveyService.getSurveys().then(handleSuccessSurveys);
    }
    
    function handleSuccessSurveys(data, status) {
        self.surveys = data;
    }
    
    function usersSelected() {
        self.active = "users";
    }
    
    function surveysSelected() {
        self.active = "surveys";
    }
    
    function answersSelected() {
        self.active = "answers";
    }
    
    function questionsSelected() {
        self.active = "questions"
    }

  }
})();