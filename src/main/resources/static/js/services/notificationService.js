(function () {
  angular.module('app')
  .factory('NotificationService', NotificationService);
  
  NotificationService.$inject = ['$http', '$q', '$filter'];
  
  function NotificationService($http, $q, $filter) {
    
  var service = {
    deleteNotification: deleteNotification,
    postSurveyNotification: postSurveyNotification
  }
  return service;
    
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
    
  function postSurveyNotification(survey, notification) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/notifications/survey/" + survey.id,
        data: notification
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to post a notification");
      });
      return def.promise;
    }
  }
  
})();