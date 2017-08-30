(function(){
  angular.module('app')
    .controller('SurveyCreationController', SurveyCreationController);

  SurveyCreationController.$inject = ['SurveyService', '$location', '$scope'];

  function SurveyCreationController(SurveyService, $location, $scope) {

    var self = this;
    self.generateSurvey = generateSurvey;

    init()

    function init() {
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }
    }

    function generateSurvey(survey) {
      if(!checkForm()){
        return;
      }

      SurveyService.generateSurvey(angular.copy(survey))
        .then(
        function(response){
          $location.path('/survey/new/' + response.hashedId);
        }, 
        function(error){
          console.log(error);
        })
    }

    function checkForm() {
      var focusedElement;

      if($scope.surveyForm.$invalid) {
        if($scope.surveyForm.description.$invalid) {
          $scope.surveyForm.description.$setDirty();
          focusedElement = '#description';
        }

        if($scope.surveyForm.name.$invalid) {
          $scope.surveyForm.name.$setDirty();
          focusedElement = '#name';
        }

        $(focusedElement).focus();

        return false;
      }

      return true;
    }

  };
})();