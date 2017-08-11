(function(){
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$location', 'UserService'];

  function MainController($location, UserService) {

        var mc = this;
		this.$location = $location;
		mc.removeUser = removeUser;
		mc.getUser = getUser;

		init();

		function init() {
          mc.getUser();
        }
  
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
    
    this.theme = this.themes[7];
    
    function removeUser() {
        UserService.removeUser();
        $location.path('/');
    }
    
    function getUser() {
      var user = UserService.getUser();
      if(!user) {
        return null;
      }
        return user.name;
    }
    
  };
})();