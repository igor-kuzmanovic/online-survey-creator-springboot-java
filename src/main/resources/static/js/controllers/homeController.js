(function () {
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['SurveyService', 'UserService', '$location'];

  function HomeController(SurveyService, UserService, $location) {

    var hc = this;
    hc.deleteSurvey = deleteSurvey;
    hc.setCurrentSurvey = setCurrentSurvey;

    init();
    getSurveys();

    function init(){
      var user = UserService.getUser();
      if(!user) {
        $location.url('/');
      }
    }

    function getSurveys(){
      SurveyService.getSurveys().then(handleSuccessSurveys);
    }

    function handleSuccessSurveys(data, status) {
      hc.surveys = data;
    }
    
    function setCurrentSurvey(survey) {
      hc.currentSurvey = survey;
    }

    function deleteSurvey() {
      SurveyService.deleteSurvey(hc.currentSurvey.id).then(function(response) {
        $('#deleteSurveyModal').modal('hide');
        getSurveys();
      }, function(error){
        hc.error = error;
      })
    }

  };
})();
