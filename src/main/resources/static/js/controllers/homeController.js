(function () {
  angular.module('app')
    .controller('HomeController', HomeController);

  <<<<<<< HEAD
  HomeController.$inject = ['SurveyService', 'UserService', '$location'];

  function HomeController(SurveyService, UserService, $location) {

    init();

    function init(){
      var user = UserService.getUser();
      if(!user) {
        $location.url('/');
      }
      else {
        getSurveys();
      }
    }

    function getSurveys(){
      SurveyService.getSurveys().then(handleSuccessSurveys);
    }

    function handleSuccessSurveys(data, status) {
      this.surveys = data;
    }

  };
})();