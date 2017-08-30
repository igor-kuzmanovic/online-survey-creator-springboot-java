(function () {
  angular.module("app")
    .factory('SurveyService', SurveyService);

  SurveyService.$inject = ['$http', '$q', '$filter'];

  function SurveyService($http, $q, $filter) {

    var service = {
      saveSurvey: saveSurvey,
      deleteSurvey: deleteSurvey,
      generateSurvey: generateSurvey,
      getSurveys: getSurveys,
      getCurrentSurvey: getCurrentSurvey,
      getSurveyComments: getSurveyComments,
        getSurveyByQuestion: getSurveyByQuestion,
        getSurveyByComment: getSurveyByComment
    };

    function saveSurvey(survey) {
      if(survey.expirationDate) {
        survey.expirationDate = $filter('date')(survey.expirationDate, "yyyy-MM-dd");
      }
      
      var def = $q.defer();
      var req = {
        method: 'PUT',
        url: "/api/survey",
        data: survey
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to save a survey!");
      });
      return def.promise;
    }

    function deleteSurvey(id) {
      var def = $q.defer();
      var req = {
        method: 'DELETE',
        url: "/api/survey/" + id
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to delete a survey");
      });
      return def.promise;
    }

    function generateSurvey(survey) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/survey",
        data: survey
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to generate a new survey!");
      });
      return def.promise;
    }

    function getCurrentSurvey(hashedId) {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "/api/survey/" + hashedId
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to get current survey!");
      });
      return def.promise;
    }

    function getSurveys() {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "/api/survey"
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to get all surveys!");
      });
      return def.promise;
    }

    function getSurveyComments(survey) {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "/api/survey/" + survey.id + "/comment"
      };
      $http(req)
        .success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to get comments for selected survey");
      });
      return def.promise;
    }
    
    function getSurveyByQuestion(id) {
        var def = $q.defer();
        var req = {
            method: 'GET',
            url: "/api/survey/question/" + id
        };
        $http(req)
            .success(function (data) {
                def.resolve(data);
            })
            .error(function () {
                def.reject("Failed to get survey for given question!");
            });
        return def.promise;
    }
    
    function getSurveyByComment(id) {
        var def = $q.defer();
        var req = {
            method: 'GET',
            url: "/api/survey/comment/" + id
        };
        $http(req)
            .success(function (data) {
                def.resolve(data);
            })
            .error(function () {
                def.reject("Failed to get survey for given comment!");
            });
        return def.promise;
    }
    
    return service;

  }
} ());
