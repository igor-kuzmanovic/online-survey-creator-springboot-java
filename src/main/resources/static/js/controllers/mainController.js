(function(){
	angular.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['UserService', 'CookieService', '$location', '$route'];

	function MainController(UserService, CookieService, $location, $route) {

		var self = this;
		self.init = init; 
		self.checkUser = checkUser;
		self.removeUser = removeUser;
		self.getUser = getUser;
		self.getImage = getImage;

		self.$location = $location;
		self.themes = [
			{ name: 'Cerulean', url: 'cerulean' },
			{ name: 'Cosmo', url: 'cosmo' },
			{ name: 'Cyborg', url: 'cyborg' },
			{ name: 'Darkly', url: 'darkly' },
			{ name: 'Flatly', url: 'flatly' },
			{ name: 'Journal', url: 'journal' },
			{ name: 'Lumen', url: 'lumen' },
			{ name: 'Paper', url: 'paper' },
			{ name: 'Readable', url: 'readable' },
			{ name: 'Sandstone', url: 'sandstone' },
			{ name: 'Simplex', url: 'simplex' },
			{ name: 'Slate', url: 'slate' },
			{ name: 'Solar', url: 'solar' },
			{ name: 'Spacelab', url: 'spacelab' },
			{ name: 'Superhero', url: 'superhero' },
			{ name: 'United', url: 'united' },
			{ name: 'Yeti', url: 'yeti' }
		];

		self.theme = self.themes[4];

		init();

		function init() {
			getUser();
			getImage();
		}

		function checkUser() {
			if(self.user) {
				return self.user;
			}
		}

		function getImage() {
			if(self.user) {
				UserService.getImageFromUrl()
					.then(
					function(response){
						self.img = response;
					},
					function(error){
						alert(error);
						console.log(error);
					});
			}
		}

		function handleSuccessImage(data, status) {
			self.img = data;
		}

		function getUser() {
			self.user = UserService.getUser();

			if(!self.user && UserService.checkUserCookies()) {
				console.log('User not found, cookies found');
				var credentials = {};
				credentials.username = CookieService.getCookie('username');
				credentials.password = CookieService.getCookie('password');

				UserService.login(credentials, true)
					.then(
					function(response){
						self.user = response;
						console.log('Logged in ' + self.user.username + ' from cookies');
						$route.reload();
					},
					function(error){
						console.log(error);
						alert(error);					
					});
			}
			else if(!self.user && !UserService.checkUserCookies()) {
				console.log('User not found, cookies not found');
			}

			if(self.user) {
				console.log('User found');
				getImage();
			}
		}

		function removeUser() {
			UserService.removeUser();
			delete self.user;
			$location.path('/');
		}
	};
})();