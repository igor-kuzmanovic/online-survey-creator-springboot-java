(function(){
    angular.module('app')
        .controller('VerifyUserController', VerifyUserController);

    VerifyUserController.$inject = ['UserService', '$location'];

    function VerifyUserController(UserService, $location) {

        var self = this;
        self.goToLogin = goToLogin;

        init();

        function init(){
            self.user = UserService.getRegisteredUser();
        }
    
        function goToLogin() {
            $location.path('/');
        }
    };
})();