(function () {
  angular.module('app')
    .controller('UserNotificationsController', UserNotificationsController);

  UserNotificationsController.$inject = ['$scope'];

  function UserNotificationsController($scope) {

    var self = this;

    init();

    function init() {
      $scope.mc.checkUser();
    }

  }
})();