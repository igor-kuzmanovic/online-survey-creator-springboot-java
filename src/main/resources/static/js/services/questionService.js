(function () {
  angular.module("app")
    .factory('QuestionService', QuestionService);

  QuestionService.$inject = ['$http', '$q'];

  function QuestionService($http, $q) {

    var service = {
      saveQuestion: saveQuestion,
      deleteQuestion: deleteQuestion
    }

    function saveQuestion(surveyId, question) {
      console.log(surveyId + "_" + question);
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "question/" + surveyId,
        data: question
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to save a question!");
      });
      return def.promise;
    }

    function deleteQuestion(questionId) {
      var def = $q.defer();
      var req = {
        method: 'DELETE',
        url: "question/" + questionId
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