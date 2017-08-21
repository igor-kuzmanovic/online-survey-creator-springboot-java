(function(){
  angular.module('app')
    .controller('RegistrationController', RegistrationController);

  RegistrationController.$inject = ['UserService', '$location'];

  function RegistrationController(UserService, $location) {

    var self = this;
    self.saveUser = saveUser;
    var registeredUser;

    init();

    function init(){
      renderCaptcha();
    }

    function renderCaptcha() {
      grecaptcha.render('captcha', {
        'sitekey' : '6LfO0SwUAAAAAI73tCuECJHe4MRpJyHQQUbH1RdZ'
      });
    };

    function saveUser(savedUser) {
      registeredUser = savedUser;
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
      registeredUser.userStatus = {id: 1, type:"STATUS_ACTIVE"};
      registeredUser.roles = [{id: 2, type:"ROLE_USER"}];
      UserService.saveUser(registeredUser).then(handleSuccessUser, function(error){
        console.log(error);
      });
    }

    function handleSuccessUser() {
      $location.path('/');
    }

  };
})();