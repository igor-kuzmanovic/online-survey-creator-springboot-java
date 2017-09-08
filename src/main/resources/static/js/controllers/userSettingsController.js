(function () {
  angular.module('app')
    .controller('UserSettingsController', UserSettingsController);

  UserSettingsController.$inject = ['UserService', 'ImageService', '$scope', '$location'];

  function UserSettingsController(UserService, ImageService, $scope, $location) {

    var self = this;
    self.editUser = editUser;
    self.onSuccess = onSuccess;

    init();

    function init(){
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }
      else {
        loadImages();
      }
    }

    function loadImages() {
      ImageService.getAllImagesBinary()
        .then(
        function(response) {
          self.userImageMap = response;
          getWholeUser(UserService.getUser().username);
        },
        function(error){
          console.log(error);
          self.error = error;
        });
    }

    function onSuccess(response) {
      loadImages();
      $scope.mc.loadImages();
    }

    function getWholeUser(username) {
      UserService.findUser(username)
        .then(
        function(response) {
          self.wholeUser = response;
          self.wholeUser.imageUrl = self.userImageMap[self.wholeUser.username];
        }, 
        function(error) {
          console.log(error);
          self.error = error;
        });
    }

    function editUser() {
      if(!checkForm()){
        return;
      }

      UserService.editUser(self.wholeUser)
        .then(
        function(response) {
          UserService.setUser(response);
        }, 
        function(error) {
          console.log(error);
          self.error = error;
        });
    }

    function checkForm() {
      var focusedElement;

      if(self.userForm.$invalid) {
        if(self.userForm.password.$invalid) {
          self.userForm.password.$setDirty();
          focusedElement = '#password';
        }

        $(focusedElement).focus();

        return false;
      }

      return true;
    }

  };
})();