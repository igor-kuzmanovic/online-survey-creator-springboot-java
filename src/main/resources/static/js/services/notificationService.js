(function () {
  angular.module('app')
    .factory('NotificationService', NotificationService);

  NotificationService.$inject = ['$http', '$q', '$filter'];

  function NotificationService($http, $q, $filter) {

    var service = {
      getUserNotifications: getUserNotifications,
      deleteNotification: deleteNotification,
      postSurveyNotification: postSurveyNotification,
      postCommentNotification: postCommentNotification,
      reportSurveyNotification: reportSurveyNotification,
      reportCommentNotification: reportCommentNotification
    }
    return service;

    function getUserNotifications(id) {
      var def = $q.defer();
      var req = {
        method: 'GET',
        url: "/api/notifications/user/" + id
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to find user notifications");
      });
      return def.promise;
    }

    function deleteNotification(id) {
      var def = $q.defer();
      var req = {
        method: 'DELETE',
        url: "/api/notifications/" + id
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to delete a notification");
      });
      return def.promise;
    }

    function postSurveyNotification(survey) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/notifications/survey/" + survey.id
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to post a survey notification");
      });
      return def.promise;
    }


    function postCommentNotification(comment) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/notifications/comment/" + comment.id
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to post a comment notification");
      });
      return def.promise;
    }


    function reportSurveyNotification(survey) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/notifications/report/survey/" + survey.id
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to post a report survey notification");
      });
      return def.promise;
    }


    function reportCommentNotification(commentId) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/notifications/report/comment/" + commentId
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to post a report comment notification");
      });
      return def.promise;
    }

  }
})();