(function () {
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['SurveyService', '$scope'];

  function HomeController(SurveyService, $scope) {

    var self = this;
    self.deleteSurvey = deleteSurvey;
    self.setCurrentSurvey = setCurrentSurvey;

    init();

    function init(){
      $scope.mc.checkUser();
      getSurveys();
    }

    function getSurveys(){
      SurveyService.getSurveys().then(handleSuccessSurveys);
    }

    function handleSuccessSurveys(data, status) {
      self.surveys = data;
    }
    
    function setCurrentSurvey(survey) {
      self.currentSurvey = survey;
    }

    function deleteSurvey() {
      SurveyService.deleteSurvey(self.currentSurvey.id).then(function(response) {
        $('#deleteSurveyModal').modal('hide');
        getSurveys();
      }, function(error){
        self.error = error;
      })
    }

  };
})();
