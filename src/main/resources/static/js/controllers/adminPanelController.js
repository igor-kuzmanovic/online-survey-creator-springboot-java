(function () {
  angular.module('app')
    .controller('AdminPanelController', AdminPanelController);

  AdminPanelController.$inject = ['UserService', '$scope'];

  function AdminPanelController(UserService, $scope) {

    var self = this;

    init();
    
    function init() {
      $scope.mc.checkUser();
    }

  }
})();