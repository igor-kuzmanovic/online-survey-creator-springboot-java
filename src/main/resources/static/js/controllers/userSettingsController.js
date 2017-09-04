(function () {
  angular.module('app')
    .controller('UserSettingsController', UserSettingsController);

  UserSettingsController.$inject = ['UserService', '$scope'];

  function UserSettingsController(UserService, $scope) {

    var self = this;
    self.editUser = editUser;
    self.onSuccess = onSuccess;

    init();

    function init(){
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }

      getWholeUser(UserService.getUser().username);
    }

    function onSuccess(response) {
      init();
      UserService.findUser(self.wholeUser.username).then(function (data, response) {
          $scope.mc.setImage(data.imageUrl);
      });
    }

    function getWholeUser(username) {
      UserService.findUser(username).then(handleSuccessWholeUser);
    }

    function handleSuccessWholeUser(data, status){
      self.wholeUser = data;
    }

    function editUser() {
      UserService.editUser(self.wholeUser).then(handleSuccessEditedUser);
    }

    function handleSuccessEditedUser(data, status){
      UserService.setUser(data);
    }

  }
})();