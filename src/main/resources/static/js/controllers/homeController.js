(function(){
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['SurveyService'];

  function HomeController(SurveyService) {

    init();
    
    function init(){
        getSurveys();
    }
    
    function getSurveys(){
          SurveyService.getSurveys().then(handleSuccessSurveys);
      }
    
	 function handleSuccessSurveys(data, status) {
	 this.surveys = data;
	 
}
    
  };
})();