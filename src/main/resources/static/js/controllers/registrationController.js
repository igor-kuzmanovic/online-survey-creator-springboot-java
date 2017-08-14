(function(){
    angular.module('app')
        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['UserService', '$location'];

    function RegistrationController(UserService, $location) {
        var rc = this;
        rc.saveUser = saveUser;

        init();

        function init(){

        }

        function saveUser(savedUser) {
            savedUser.userStatus = {id: 1, type:"STATUS_ACTIVE"};
            savedUser.roles = [{id: 2, type:"ROLE_USER"}];
            UserService.saveUser(savedUser).then(handleSuccessUser,
                function(error){
                    console.log(error);
                });
        }

        function handleSuccessUser() {
            console.log("User created");
            $location.path('/');
        }

    };
})();