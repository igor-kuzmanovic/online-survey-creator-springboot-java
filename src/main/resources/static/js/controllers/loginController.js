(function(){
  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['UserService', '$location', '$scope'];

  function LoginController(UserService, $location, $scope) {

    var self = this;
    self.getCredentials = getCredentials;
    self.checkForm = checkForm;

    function getCredentials(credentials) {
      UserService.login(credentials).then(handleSuccessCredentials);
    }

    function handleSuccessCredentials(data, status){
      //self.user = data;
      $scope.mc.init();
      $location.path('/home');
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