(function () {
    angular.module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['SurveyService', 'UserService', '$location'];

    function HomeController(SurveyService, UserService, $location) {

        this.init = init;
        this.generateSurvey = generateSurvey;

        init();

        function init(){
            var user = UserService.getUser();
            if(!user) {
                $location.url('/');
            }
        }

        function generateSurvey(newSurvey) {
            SurveyService.generateSurvey(newSurvey)
                .then (
                    function (response) {
                        $location.path('/survey/create/' + response.hashedId);
                    },
                    function (error) {
                        console.log(error);
                })
        }

    };
})();