(function(){
	angular.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['UserService', '$location'];

	function LoginController(UserService, $location) {
    
		var self = this;
		self.getCredentials = getCredentials;

		init();

		function init(){
		}

		function getCredentials(credentials) {
			UserService.login(credentials).then(handleSuccessCredentials);
		}

		function handleSuccessCredentials(data, status){
			self.user = data;
			$location.path('/home');
		}

	};
})();