(function () {
	angular.module('app')
		.controller('UserSettingsController', UserSettingsController);

	UserSettingsController.$inject = ['UserService', 'ImageService', '$scope', '$location'];

	function UserSettingsController(UserService, ImageService, $scope, $location) {

    var self = this;
    self.editUser = editUser;
    self.onSuccess = onSuccess;
    
    self.userImageMap = null;

    init();

    function init(){
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }

      loadImages();

    }

    function loadImages() {
        ImageService.getAllImagesBinary().then(function (data, status) {
            userImageMap = data;
            getWholeUser(UserService.getUser().username);
        });
    }

    function onSuccess(response) {
        loadImages();
        $scope.mc.loadImages();
    }

	function getWholeUser(username) {
		UserService.findUser(username).then(handleSuccessWholeUser, function(error) {
			console.log(error);
			alert(error);
		});
	}

	function handleSuccessWholeUser(data, status){
		self.wholeUser = data;
		self.wholeUser.imageUrl = userImageMap[self.wholeUser.username];
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