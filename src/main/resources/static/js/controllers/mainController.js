(function(){
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$location'];

  function MainController($location) {
		
		this.$location = $location;
  
    this.themes = [
      { name: 'Cerulean', url: 'cerulean' },
      { name: 'Cosmo', url: 'cosmo' },
      { name: 'Cyborg', url: 'cyborg' },
      { name: 'Darkly', url: 'darkly' },
      { name: 'Flatly', url: 'flatly' },
      { name: 'Journal', url: 'journal' },
      { name: 'Lumen', url: 'lumen' },
      { name: 'Readable', url: 'readable' },
      { name: 'Sandstone', url: 'sandstone' },
      { name: 'Simplex', url: 'simplex' },
      { name: 'Slate', url: 'slate' },
      { name: 'Solar', url: 'solar' },
      { name: 'Spacelab', url: 'spacelab' },
      { name: 'Superhero', url: 'superhero' },
      { name: 'United', url: 'united' },
      { name: 'Yeti', url: 'yeti' },
      { name: 'Basic', url: 'cosmo' },
    ];
    
    this.theme = this.themes[0];
    
    
  };
})();