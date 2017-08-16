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
            getLoggedUser(UserService.getUser().name);
        }

        function getLoggedUser(username) {
            UserService.findUser(username).then(handleSuccessLoggedUser);
        }

        function handleSuccessLoggedUser(data, status){
            self.user = data;
        }

        function editUser(user) {
            UserService.editUser(user).then(handleSuccessEditedUser);
        }

        function handleSuccessEditedUser(data, status){
            var editedUser = {};
            editedUser.name = data.username;
            editedUser.roles = data.roles;
            UserService.setUser(editedUser);
        }

    };
})();