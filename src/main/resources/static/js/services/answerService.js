(function () {
  angular.module("app")
    .factory('AnswerService', AnswerService);

  AnswerService.$inject = ['$http', '$q'];

  function AnswerService($http, $q) {

    var service = {
      saveAnswer: saveAnswer,
      deleteAnswer: deleteAnswer
    }

    function saveAnswer(questionId, answer) {
      console.log(questionId + "_" + answer);
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "answer/" + questionId,
        data: answer
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to save an answer!");
      });
      return def.promise;
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