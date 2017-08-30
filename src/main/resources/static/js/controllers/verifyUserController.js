(function(){
  angular.module('app')
    .controller('VerifyUserController', VerifyUserController);

  VerifyUserController.$inject = ['$location', '$scope'];

  function VerifyUserController($location, $scope) {

    var self = this;
    self.goToLogin = goToLogin;

    init();

    function init() {
      if ($scope.mc.checkUser()) {
        $location.path('/home');
      }
    }

    function goToLogin() {
      $location.path('/');
    }
  };
})();