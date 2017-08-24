(function () {
  angular.module('app')
    .controller('UserNotificationsController', UserNotificationsController);

  UserNotificationsController.$inject = ['NotificationService', 'UserService', '$scope'];

  function UserNotificationsController(NotificationService, UserService, $scope) {

    var self = this;
    self.getUserNotifications = getUserNotifications;
    self.deleteNotification = deleteNotification;

    init();

    function init() {
      $scope.mc.checkUser();
      getUserNotifications();
    }
    
     function getUserNotifications() {
      var user = $scope.mc.checkUser()
      UserService.getUserNotifications(user).then(handleSuccessUserNotifications);
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