(function(){
  angular.module('app')
    .controller('SurveyCustomizationFinishController', SurveyCustomizationFinishController);

  SurveyCustomizationFinishController.$inject = ['SurveyService', '$location', '$routeParams', '$filter', '$scope'];

  function SurveyCustomizationFinishController(SurveyService, $location, $routeParams, $filter, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.saveSurvey = saveSurvey;
    self.setPublicationDate = setPublicationDate;
    self.setExpirationDate = setExpirationDate;

    init()

    function init() {
      $scope.mc.checkUser();
      self.surveyHashedId = $routeParams.hashedId;
      getCurrentSurvey();
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
          self.surveyActivation = 1;
          self.surveyDeactivation = 1;
          setPublicationDate();
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

      if(self.surveyActivation === 1) {
        self.survey.publicationDate = new Date();
        self.survey.isActive = true;
      }
      
      if(self.surveyDeactivation === 2) {
        self.survey.isActive = false;
      }

      if(self.surveyDeactivation === 1) {
        self.survey.expirationDate = null;
      }

      SurveyService.saveSurvey(angular.copy(self.survey))
        .then(
        function(response){
          $location.path('/survey/submit/' + response.hashedId);
        }, 
        function(error){
          console.log(error);
        })
    }

    function setPublicationDate() {
      self.survey.publicationDate = new Date();
    }

    function setExpirationDate() {
      self.survey.expirationDate = new Date();
    }

    function checkForm() {
      var focusedElement;

      if($scope.surveyForm.$invalid) {
        if($scope.surveyForm.expirationDate && $scope.surveyForm.expirationDate.$invalid) {
          $scope.surveyForm.expirationDate.$setDirty();
          focusedElement = '#expirationDate';
        }

        if($scope.surveyForm.publicationDate && $scope.surveyForm.publicationDate.$invalid) {
          $scope.surveyForm.publicationDate.$setDirty();
          focusedElement = '#publicationDate';
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