(function(){
  angular.module('app')
    .controller('RegistrationController', RegistrationController);

  RegistrationController.$inject = ['UserService', '$location', '$window', '$scope'];

  function RegistrationController(UserService, $location, $window, $scope) {

    var self = this;
    self.saveUser = saveUser;

    init();

    function init() {
      if ($scope.mc.checkUser()) {
        $location.path('/home');
      }
      else {
        renderCaptcha();
      }
    }

    function renderCaptcha() {
      self.recaptchaId = grecaptcha.render('captcha', {
        'sitekey' : '6LfO0SwUAAAAAI73tCuECJHe4MRpJyHQQUbH1RdZ'
      });
    }

    function saveUser(savedUser) {
      if(!checkForm()){
        return;
      }

      self.registeredUser = savedUser;

      if(!self.captchaDone) {
        self.captchaResponse = grecaptcha.getResponse(self.recaptchaId);

        if(!self.captchaResponse) {
          console.log("Please complete the captcha!");	
          self.error = "Please complete the captcha!";
          return;
        }

        UserService.sendCaptchaResponse(self.captchaResponse).then(handleSuccessCaptcha, function(error){
          console.log(error);
          self.error = error;
        });
      }
      else {
        registerUser();
      }
    }

    function handleSuccessCaptcha(data, status) {
      self.captchaDone = true;
      registerUser();
    }

    function registerUser() {
      self.registeredUser.userStatus = {id: 1, type:"STATUS_ACTIVE"};
      self.registeredUser.roles = [{id: 2, type:"ROLE_USER"}];

      UserService.saveUser(self.registeredUser).then(handleSuccessUser, function(error){
        if(error === 'email') {
          console.log('Email already in use!');
          self.error = 'Email already in use!';
        } else if(error === 'username') {
          console.log('Username already in use!');
          self.error = 'Username already in use!';
        } else {
          console.log('Email already in use!');
          self.error = 'Email already in use';
        }
      });
    }

    function handleSuccessUser() {
      $location.path('/user/verify');
    }

    function checkForm() {
      var focusedElement;

      if(self.signupForm.$invalid) {
        if(self.signupForm.email.$invalid) {
          self.signupForm.email.$setDirty();
          focusedElement = '#email';
        }

        if(self.signupForm.password.$invalid) {
          self.signupForm.password.$setDirty();
          focusedElement = '#password';
        }

        if(self.signupForm.username.$invalid) {
          self.signupForm.username.$setDirty();
          focusedElement = '#username';
        }

        $(focusedElement).focus();

        return false;
      }

      return true;
    }

  }
})();