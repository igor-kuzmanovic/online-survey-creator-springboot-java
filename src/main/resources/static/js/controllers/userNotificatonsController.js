(function () {
  angular.module('app')
    .controller('UserNotificationsController', UserNotificationsController);

  UserNotificationsController.$inject = ['NotificationService', '$scope'];

  function UserNotificationsController(NotificationService, $scope) {

    var self = this;
    self.getUserNotifications = getUserNotifications;
    self.deleteNotification = deleteNotification;

    init();

    function init() {
      $scope.mc.checkUser();
      
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

  }
})();