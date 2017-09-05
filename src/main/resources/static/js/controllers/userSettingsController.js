(function () {
	angular.module('app')
		.controller('UserSettingsController', UserSettingsController);

	UserSettingsController.$inject = ['UserService', 'ImageService', '$scope'];

	function UserSettingsController(UserService, ImageService, $scope) {

    var self = this;
    self.editUser = editUser;
    self.onSuccess = onSuccess;
    self.logImages = logImages;

    init();

    function init(){
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }

      getWholeUser(UserService.getUser().username);
    }
    
    function logImages() {
        ImageService.getAllImages().then(function (data, status) {
           console.log(data);
        });
    }

    function onSuccess(response) {
      init();
      
      UserService.findUser(self.wholeUser.username).then(function (data, response) {
          $scope.mc.setImage(data.imageUrl);
      });
    }

		function getWholeUser(username) {
			UserService.findUser(username).then(handleSuccessWholeUser, function(error) {
				console.log(error);
				alert(error);
			});
		}

		function handleSuccessWholeUser(data, status){
			self.wholeUser = data;
		}

		function editUser() {
			UserService.editUser(self.wholeUser).then(handleSuccessEditedUser, function(error) {
				console.log(error);
				alert(error);
			});
		}

		function handleSuccessEditedUser(data, status){
			UserService.setUser(data);
		}

	};
})();