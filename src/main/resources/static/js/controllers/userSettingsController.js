(function () {
  angular.module('app')
    .controller('UserSettingsController', UserSettingsController);

  UserSettingsController.$inject = ['UserService', '$scope'];

  function UserSettingsController(UserService, $scope) {

    var self = this;
    self.editUser = editUser;
    self.onSuccess = onSuccess;
    self.getImage = getImage;

    init();

    function init(){
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }

      getWholeUser(UserService.getUser().username);
      getImage();
    }

    function onSuccess(response) {
      init();
      $scope.mc.getImage();
    }

    function getImage() {
      UserService.getImageFromUrl().then(handleSuccessImage);
    }

    function handleSuccessImage(data, status) {
      self.img = data;
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

  };
})();