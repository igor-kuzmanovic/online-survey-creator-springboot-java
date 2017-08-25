(function(){
    angular.module('app')
        .controller('VerifyUserController', VerifyUserController);

    VerifyUserController.$inject = ['$location'];

    function VerifyUserController($location) {

        var self = this;
        self.goToLogin = goToLogin;

        init();

        function init(){}
    
        function goToLogin() {
            $location.path('/');
        }
    };
})();