(function () {
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['SurveyService', '$scope', '$sce'];

  function HomeController(SurveyService, $scope, $sce) {

    var self = this;
    self.deleteSurvey = deleteSurvey;
    self.setCurrentSurvey = setCurrentSurvey;
    self.generateFacebookLink = generateFacebookLink;
    self.generateTwitterLink = generateTwitterLink;

    self.$sce = $sce;
    self.fbLink = [];
    self.twitterLink = [];

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

    function generateFacebookLink(id) {
      self.fbLink.push($sce.trustAsResourceUrl('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftech9survey.github.io%2F' + id + '&amp;src=sdkpreparse'));
    }

    function generateTwitterLink(name, id) {
      self.twitterLink.push($sce.trustAsResourceUrl('https://twitter.com/intent/tweet?text=' + name + '&url=https%3A%2F%2Ftech9survey.github.io%2F' + id));
    }

  };
})();
