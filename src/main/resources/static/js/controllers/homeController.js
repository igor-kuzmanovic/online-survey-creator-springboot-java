(function () {
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['SurveyService', '$scope', '$location'];

  function HomeController(SurveyService, $scope, $location) {

    var self = this;
    self.deleteSurvey = deleteSurvey;
    self.setCurrentSurvey = setCurrentSurvey;
    self.facebookShare = facebookShare;
    self.deactivateSurvey = deactivateSurvey;

    self.facebookLink = [];
    self.twitterLink = [];
    self.googleLink = [];

    init();

    function init(){
      $scope.mc.getImage();
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }

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

    function facebookShare(id) {
      var facebookHref = 'https://tech9survey.github.io/#/' + id + '/';

      FB.ui({
        method: 'share',
        display: 'popup',
        href: facebookHref,
      }, function(response){});
    }

    function deactivateSurvey() {
      SurveyService.deactivateSurvey(self.currentSurvey.id)
        .then(
        function(response){
          getSurveys();
        }, 
        function(error){
          console.log(error);
        })
    }
  };
})();
