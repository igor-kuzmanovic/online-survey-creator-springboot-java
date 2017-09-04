(function(){
  angular.module('app')
    .controller('SurveyDetailsController', SurveyDetailsController);

  SurveyDetailsController.$inject = ['SurveyService', '$routeParams', '$scope'];

  function SurveyDetailsController(SurveyService, $routeParams, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;

    init();

    function init() {
      $scope.mc.getImage();
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }

      self.surveyHashedId = $routeParams.hashedId;
      getCurrentSurvey();
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
        });
    }

  }
})();