(function(){
  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['UserService', '$location', '$scope'];

  function LoginController(UserService, $location, $scope) {

    var self = this;
    self.getCredentials = getCredentials;

    function getCredentials(credentials) {
      UserService.login(credentials).then(handleSuccessCredentials);
    }

    function handleSuccessCredentials(data, status){
      self.user = data;
      $scope.mc.init();
      $location.path('/home');
    }

  };
})();