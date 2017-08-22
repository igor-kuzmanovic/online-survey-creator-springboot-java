(function () {
    angular.module('app')
        .controller('UserSettingsController', UserSettingsController);

    UserSettingsController.$inject = ['UserService'];

    function UserSettingsController(UserService) {

        var self = this;
        self.editUser = editUser;
        self.onSuccess = onSuccess;
        
        init();

        function init(){
            getWholeUser(UserService.getUser().username);
        }
        
        function onSuccess(response) {
            getWholeUser(UserService.getUser().username);
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