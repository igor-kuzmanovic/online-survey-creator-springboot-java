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
		}

		function saveUser(savedUser) {
			if(!checkForm()){
				return;
			}

			self.registeredUser = savedUser;
			var response = grecaptcha.getResponse();;

			if(!response) {
				console.log('Captcha is not done');
				alert('Captcha is not done');		
				return;
			}

			UserService.sendCaptchaResponse(response).then(handleSuccessCaptcha, function(error){
				console.log(error);
				console.log('Captcha failed!');
				alert(error);			
			});
		}

		function handleSuccessCaptcha(data, status) {
			self.registeredUser.userStatus = {id: 1, type:"STATUS_ACTIVE"};
			self.registeredUser.roles = [{id: 2, type:"ROLE_USER"}];

			UserService.saveUser(self.registeredUser).then(handleSuccessUser, function(error){
				if(error === 'email') {
					console.log('Email already in use!');
					alert('Email already in use!');
				} else if(error === 'username') {
					console.log('Username already in use!');
					alert('Username already in use!');
				} else {
					console.log('Email already in use!');
					alert('Email already in use!');
				}
			});
		}

		function handleSuccessUser() {
			$window.location.reload();
			$location.path('/user/verify');
		}

		function checkForm() {
			var focusedElement;

			if($scope.signupForm.$invalid) {
				if($scope.signupForm.email.$invalid) {
					$scope.signupForm.email.$setDirty();
					focusedElement = '#email';
				}

				if($scope.signupForm.password.$invalid) {
					$scope.signupForm.password.$setDirty();
					focusedElement = '#password';
				}

				if($scope.signupForm.username.$invalid) {
					$scope.signupForm.username.$setDirty();
					focusedElement = '#username';
				}

				$(focusedElement).focus();

				return false;
			}

			return true;
		}

	}
})();