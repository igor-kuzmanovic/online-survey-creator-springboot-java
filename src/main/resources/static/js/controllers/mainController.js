(function(){
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['UserService', '$location'];

  function MainController(UserService, $location) {

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

    self.theme = self.themes[0];

    init();

    function init() {
      self.getUser();
      self.checkUser();
      self.getImage();
    }

    function checkUser() {
      if(self.user) {
        return self.user;
      }
    }

    function getImage() {
      if(!self.user) {
        return;
      }
      UserService.getImageFromUrl().then(handleSuccessImage);
    }

    function handleSuccessImage(data, status) {
      self.img = data;
    }

    function getUser() {
      self.user = UserService.getUser();
    }

    function removeUser() {
      UserService.removeUser();
      delete self.user;
      $location.path('/');
    }
  };
})();