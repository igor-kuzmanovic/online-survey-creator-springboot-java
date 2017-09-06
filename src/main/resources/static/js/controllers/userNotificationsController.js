(function () {
  angular.module('app')
    .controller('UserNotificationsController', UserNotificationsController);

  UserNotificationsController.$inject = ['NotificationService', 'UserService', 'ImageService', '$scope', '$location'];

  function UserNotificationsController(NotificationService, UserService, ImageService, $scope, $location) {

    var self = this;

    self.$location = $location;

    init();

    function init() {
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }
      else {
        self.user = $scope.mc.checkUser();
        loadImages();
      }
    }
    
    function loadImages() {
      ImageService.getAllImagesBinary().then(function (data, status) {
          self.allImages = data;
          getUserNotifications();
      });
    }

    function getUserNotifications() {
      UserService.getUserNotifications(self.user)
        .then(
        function(response){
          self.notifications = response;
          for(var i = 0; i < self.notifications.length; i++) {
            self.notifications[i].image = self.allImages[self.notifications[i].sender];
          }
          $scope.mc.unreadNotifications = 0;
        },
        function(error){
          console.log(error);
          self.initError = error;
        });
    }

  };
})();