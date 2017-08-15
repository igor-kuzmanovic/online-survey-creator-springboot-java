(function () {
  angular.module("app")
    .factory('AnswerService', AnswerService);

  AnswerService.$inject = ['$http', '$q'];

  function AnswerService($http, $q) {

    var service = {
      deleteAnswer: deleteAnswer
    }

    function deleteAnswer(answerId) {
      var def = $q.defer();
      var req = {
        method: 'DELETE',
        url: "answer/" + answerId
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to delete an answer!");
      });
      return def.promise;
    }

    return service;

  }
} ());