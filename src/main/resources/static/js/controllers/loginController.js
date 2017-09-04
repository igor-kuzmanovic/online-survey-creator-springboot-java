(function(){
	angular.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['UserService', '$location', '$scope'];

	function LoginController(UserService, $location, $scope) {

		var self = this;
		self.getCredentials = getCredentials;
		self.checkForm = checkForm;
    
		init();

		function init() {
			if ($scope.mc.checkUser()) {
				$location.path('/home');
			}
		}

		function getCredentials(credentials, rememberMe) {
			if(!checkForm()){
				return;
			}

			UserService.login(credentials, rememberMe)
				.then(
				function(response){
					$scope.mc.init();
					$location.path('/home');
				}, 
				function(error){
					console.log(error);
          self.error = error;
				})
		}

		function checkForm() {
			var focusedElement;

			if(self.loginForm.$invalid) {
				if(self.loginForm.password.$invalid) {
					self.loginForm.password.$setDirty();
					focusedElement = '#password';
				}

				if(self.loginForm.username.$invalid) {
					self.loginForm.username.$setDirty();
					focusedElement = '#username';
				}

				$(focusedElement).focus();

				return false;
			}

			return true;
		}

	};
})();