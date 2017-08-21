(function () {
  angular.module("app")
    .factory('ResultService', ResultService);

  ResultService.$inject = ['$http', '$q', '$filter'];

  function ResultService($http, $q, $filter) {

    var service = {
      submitSurvey: submitSurvey,
    }

    function submitSurvey(surveyId, surveyResult) {
      surveyResult.creationDate = $filter('date')(new Date(), "yyyy-MM-dd");
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/result/" + surveyId,
        data: surveyResult
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to submit a survey!");
      });
      return def.promise;
    }
    
    return service;

  }
}());
