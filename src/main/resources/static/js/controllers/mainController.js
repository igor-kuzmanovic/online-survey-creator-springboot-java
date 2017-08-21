(function(){
	angular.module('app')
		.controller('MainController', MainController);

	MainController.$inject = ['UserService', '$location'];

	function MainController(UserService, $location) {

		var self = this;
		self.removeUser = removeUser;
		self.getUser = getUser;
    self.init = init;

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
			self.user = UserService.getUser();
      
      if(!self.user && !$location.path().includes('/survey/submit') && !$location.path().includes('/users/activate')) {
        $location.path('/');
      }
		}

		function removeUser() {
			UserService.removeUser();
      delete self.user;
			$location.path('/');
		}
	};
})();