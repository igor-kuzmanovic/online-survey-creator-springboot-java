(function(){
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['UserService', 'NotificationService', 'ImageService', 'CookieService', '$location', '$route', '$interval'];

  function MainController(UserService, NotificationService, ImageService, CookieService, $location, $route, $interval) {

    var self = this;
    self.init = init; 
    self.checkUser = checkUser;
    self.removeUser = removeUser;
    self.getUser = getUser;
    self.loadImages = loadImages;

    self.userImageMap;    
    self.$location = $location;
    self.notificationPoll = null;

    init();

    function init() {
      getUser();

      if(self.user) {
        loadImages();
      }
    }

    function loadImages() {
      ImageService.getAllImagesBinary().then(function (data, status) {
        self.userImageMap = data;
        self.imageUrl = self.userImageMap[self.user.username];
      });
    }

    function checkUser() {
      if(self.user) {
        return self.user;
      }
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
            loadImages();
            $route.reload();
          },
          function(error){
            console.log(error);				
          });
      }
      else if(!self.user && !UserService.checkUserCookies()) {
        console.log('User not found, cookies not found');
      }

      if(self.user) {
        console.log('User found');

        if(self.user && !self.notificationPoll) {
          self.notificationPoll = $interval(function(){
            NotificationService.getUserNotifications(self.user.id)
              .then(
              function(response){
                self.user.notifications = response;
                self.unreadNotifications = 0;
                
                for(i = 0; i < self.user.notifications.length; i++) {
                  if(!self.user.notifications[i].isRead) {
                    self.unreadNotifications++;
                  }
                }
              },
              function(error){
              console.log(error);				
            });
          }, 10000);
        }
      }
    }

    function removeUser() {
      UserService.removeUser();
      delete self.user;
      $location.path('/');
    }

  }
})();