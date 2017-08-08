(function(){
  angular.module('app')
    .controller('SurveyController', SurveyController);

  SurveyController.$inject = ['SurveyService', '$location', '$route', '$routeParams'];

  function SurveyController(SurveyService, $location, $route, $routeParams) {

    this.generateSurvey = generateSurvey;

    function generateSurvey(newSurvey) {
      SurveyService.generateSurvey(newSurvey)
        .then(function(response){
        $location.path('/survey/' + response.hashedId);
      }, 
              function(error){
        console.log(error);
      })
    }  

  };
})();