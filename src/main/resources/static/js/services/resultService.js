(function () {
  angular.module("app")
    .factory('ResultService', ResultService);

  ResultService.$inject = ['$http', '$q', '$filter'];

  function ResultService($http, $q, $filter) {

    var service = {
      generateSurveyResult: generateSurveyResult,
      submitSurvey: submitSurvey,
      getSurveyResults: getSurveyResults
    }

    function generateSurveyResult(surveyId) {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "/api/result/generate/" + surveyId,
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to generate a survey result!");
      });
      return def.promise;
    }

    function submitSurvey(surveyId, surveyResult) {
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

    function getSurveyResults(surveyId) {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "/api/result/survey/" + surveyId,
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to get survey results!");
      });
      return def.promise;
    }

    return service;

  }
}());
