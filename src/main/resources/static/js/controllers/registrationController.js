(function(){
  angular.module('app')
    .controller('RegistrationController', RegistrationController);

  RegistrationController.$inject = ['UserService', '$location', '$window', '$scope'];

  function RegistrationController(UserService, $location, $window, $scope) {

    var self = this;
    self.saveUser = saveUser;
    
    self.registeredUser = {};

    init();

    function init() {
      if ($scope.mc.checkUser()) {
        $location.path('/home');
      }
      
      renderCaptcha();
    }

    function renderCaptcha() {
      grecaptcha.render('captcha', {
        'sitekey' : '6LfO0SwUAAAAAI73tCuECJHe4MRpJyHQQUbH1RdZ'
      });
    };

    function saveUser(savedUser) {
      self.registeredUser = savedUser;
      var response = grecaptcha.getResponse();

      if(response.length === 0) {
        alert("Captcha is not done.");
        return;
      }

      UserService.sendCaptchaResponse(response).then(handleSuccessCaptcha, function(error){
        console.log(error);
        console.log("Captcha failed!")
      });
    }

    function handleSuccessCaptcha(data, status) {
      self.registeredUser.userStatus = {id: 1, type:"STATUS_ACTIVE"};
      self.registeredUser.roles = [{id: 2, type:"ROLE_USER"}];
      
      UserService.saveUser(self.registeredUser).then(handleSuccessUser, function(error){
        console.log(error);
      });
    }

    function handleSuccessUser() {
      $window.location.reload();
      $location.path('/user/verify');
    }

  };
})();