(function () {
    angular.module('app')
        .controller('UserSettingsController', UserSettingsController);

    UserSettingsController.$inject = ['UserService', '$location'];

    function UserSettingsController(UserService, $location) {

        var self = this;
        self.$location = $location;
        self.editUser = editUser;

        init();

        function init(){
            getWholeUser(UserService.getUser().username);
        }

        function getWholeUser(username) {
            UserService.findUser(username).then(handleSuccessWholeUser);
        }

        function handleSuccessWholeUser(data, status){
            self.wholeUser = data;
        }

        function editUser(user) {
            UserService.editUser(user).then(handleSuccessEditedUser);
        }

        function handleSuccessEditedUser(data, status){
            UserService.setUser(data);
        }

    };
})();