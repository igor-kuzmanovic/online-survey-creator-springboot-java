(function(){
  angular.module('app')
    .controller('SurveyCustomizationFinishController', SurveyCustomizationFinishController);

  SurveyCustomizationFinishController.$inject = ['SurveyService', '$location', '$routeParams', '$filter', '$scope'];

  function SurveyCustomizationFinishController(SurveyService, $location, $routeParams, $filter, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.saveSurvey = saveSurvey;
    self.setExpirationDate = setExpirationDate;
    
    self.minDate = 0;

    init()

    function init() {
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
          self.minDate = new Date();
          self.minDate.setDate(self.minDate.getDate() + 1);
          self.surveyDeactivation = 1;
          setExpirationDate();
        }, 
        function(error){
          console.log(error);
        })
    }

    function saveSurvey() {
      if(!checkForm()) {
        return;
      }

      if(self.surveyDeactivation === 1) {
        self.survey.isActive = true;
        self.survey.expirationDate = null;
      }

      if(self.surveyDeactivation === 2) {
        self.survey.isActive = false;
      }

      SurveyService.saveSurvey(angular.copy(self.survey))
        .then(
        function(response){
          $location.path('/survey/details/' + response.hashedId);
        }, 
        function(error){
          console.log(error);
        })
    }

    function setExpirationDate() {
      self.survey.expirationDate = new Date();
      self.survey.expirationDate.setDate(self.survey.expirationDate.getDate() + 1);
    }

    function checkForm() {
      var focusedElement;

      if($scope.surveyForm.$invalid) {
        if($scope.surveyForm.expirationDate && $scope.surveyForm.expirationDate.$invalid) {
          $scope.surveyForm.expirationDate.$setDirty();
          focusedElement = '#expirationDate';
        }

        if($scope.surveyForm.exitMsg.$invalid) {
          $scope.surveyForm.exitMsg.$setDirty();
          focusedElement = '#exitMsg';
        }

        $(focusedElement).focus();

        return false;
      }

      return true;
    }

  };
})();