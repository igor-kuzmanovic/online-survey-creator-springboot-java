(function () {
  angular.module('app')
    .controller('UserNotificationsController', UserNotificationsController);

  UserNotificationsController.$inject = ['NotificationService', 'UserService', '$scope', '$location'];

  function UserNotificationsController(NotificationService, UserService, $scope, $location) {

    var self = this;
    self.deleteNotification = deleteNotification;
    
    self.$location = $location;

    init();

    function init() {
      self.user = $scope.mc.checkUser();
      getUserNotifications();
    }
    
     function getUserNotifications() {
      UserService.getUserNotifications(self.user).then(handleSuccessUserNotifications);
    }

    function handleSuccessUserNotifications(data, status) {
      self.notifications = data;
    }
                                         
    function deleteNotification(notificationId){
      NotificationService.deleteNotification(notificationId).then(function(response){
        getUserNotifications();
      }, function(error){
        console.log(error);
      })
    }
  };
})();