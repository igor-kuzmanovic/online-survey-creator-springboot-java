(function(){
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['SurveyService', '$location', '$route'];

  function HomeController(SurveyService, $location, $route) {

    this.generateSurvey = generateSurvey;

    function generateSurvey(newSurvey) {
      SurveyService.generateSurvey(newSurvey)
        .then(
        function(response){
          $location.path('/survey/create/' + response.hashedId);
      }, 
        function(error){
          console.log(error);
      })
    }  

  };
})();