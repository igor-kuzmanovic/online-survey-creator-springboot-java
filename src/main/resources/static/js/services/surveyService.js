(function () {
  angular.module("app")
    .factory('SurveyService', SurveyService);

  SurveyService.$inject = ['$http', '$q', '$filter'];

  function SurveyService($http, $q, $filter) {

    var service = {
      generateSurvey: generateSurvey
    }
    
    function generateSurvey(newSurvey) {
    	newSurvey.creationDate = $filter('date')(new Date(), "medium");
    	var def = $q.defer();
        var req = {
          method: 'POST',
          url: "survey",
          data: newSurvey
        }
        $http(req).success(function (data) {
          def.resolve(data);
        })
          .error(function () {
          def.reject("Failed to generate a new survey!");
        });
        return def.promise;
    }

    return service;

  }
} ());
