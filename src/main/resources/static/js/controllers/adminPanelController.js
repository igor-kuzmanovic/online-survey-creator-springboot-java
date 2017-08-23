(function () {
  angular.module('app')
    .controller('AdminPanelController', AdminPanelController);

  AdminPanelController.$inject = ['$scope'];

  function AdminPanelController($scope) {

    var self = this;

    init();
    
    function init() {
      $scope.mc.checkUser();
    }

  }
})();