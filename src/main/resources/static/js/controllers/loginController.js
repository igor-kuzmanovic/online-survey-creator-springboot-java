(function(){
  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['UserService', '$location'];

  function LoginController(UserService, $location) {
      var lc = this;
      lc.init = init;
      lc.getCredentials = getCredentials;

      init();

      function init(){

      }

      function getCredentials(credentials) {
          UserService.login(credentials).then(handleSuccessCredentials);
      }

      function handleSuccessCredentials(data, status){
          lc.user = data;
          $location.path('/home');
      }
  };
})();