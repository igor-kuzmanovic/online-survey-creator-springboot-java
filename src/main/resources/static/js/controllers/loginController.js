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

			if($scope.loginForm.$invalid) {
				if($scope.loginForm.password.$invalid) {
					$scope.loginForm.password.$setDirty();
					focusedElement = '#password';
				}

				if($scope.loginForm.username.$invalid) {
					$scope.loginForm.username.$setDirty();
					focusedElement = '#username';
				}

				$(focusedElement).focus();

				return false;
			}

			return true;
		}

	};
})();