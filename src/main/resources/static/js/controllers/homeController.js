(function(){
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['SurveyService'];

  function HomeController(SurveyService) {

  };
})();