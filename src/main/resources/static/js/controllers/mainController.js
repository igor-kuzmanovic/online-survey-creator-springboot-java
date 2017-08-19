(function(){
	angular.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['$location', 'UserService'];

	function MainController($location, UserService) {

		var self = this;
		self.$location = $location;
		self.removeUser = removeUser;
		self.getUser = getUser;

		this.themes = [
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

		self.theme = self.themes[7];

		init();

		function init() {
			self.getUser();
		}

		function getUser() {
			var user = UserService.getUser();
			if(!user) {
				return null;
			}
			return user;
		}

		function removeUser() {
			UserService.removeUser();
			$location.path('/');
		}
	};
})();