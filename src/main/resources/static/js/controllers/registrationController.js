(function(){
    angular.module('app')
        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['UserService'];

    function RegistrationController(UserService) {
        var rc = this;
        rc.init = init;

        init();

        function init(){

        }



    };
})();