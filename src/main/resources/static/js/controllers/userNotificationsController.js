(function () {
  angular.module('app')
    .controller('UserNotificationsController', UserNotificationsController);

  UserNotificationsController.$inject = ['NotificationService', 'UserService', '$scope', '$location'];

  function UserNotificationsController(NotificationService, UserService, $scope, $location) {

    var self = this;

    self.$location = $location;

    init();

    function init() {
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }
      else {
        self.user = $scope.mc.checkUser();
        getUserNotifications(); 
      }
    }

    function getUserNotifications() {
      UserService.getUserNotifications(self.user)
        .then(
        function(response){
          self.notifications = data;
          $scope.mc.unreadNotifications = 0;
        },
        function(error){
          console.log(error);
          self.error = error;
        });
    }

  };
})();