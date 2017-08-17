(function () {
  angular.module('app')
    .controller('SurveyDetailsController', SurveyDetailsController);

  SurveyDetailsController.$inject = ['SurveyService'];

  function SurveyDetailsController(SurveyService) {

    var self = this;
    
  };
})();