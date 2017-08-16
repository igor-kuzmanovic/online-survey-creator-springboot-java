(function () {
  angular.module('app')
    .controller('SurveyDetailsController', SurveyDetailsController);

  SurveyDetailsController.$inject = ['SurveyService', 'UserService', '$location'];

  function SurveyDetailsController(SurveyService, UserService, $location) {

    var self = this;
    self.$location = $location;
    
  };
})();