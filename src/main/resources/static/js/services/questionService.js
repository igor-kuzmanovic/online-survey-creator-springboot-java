(function () {
  angular.module("app")
    .factory('QuestionService', QuestionService);

  QuestionService.$inject = ['$http', '$q'];

  function QuestionService($http, $q) {

    var service = {
      deleteQuestion: deleteQuestion
    }
    
    function deleteQuestion(questionId) {
      var def = $q.defer();
      var req = {
        method: 'DELETE',
        url: "/api/question/" + questionId
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to delete a question!");
      });
      return def.promise;
    }

    return service;

  }
} ());