(function () {
  angular.module('app')
  .factory('NotificationService', NotificationService);
  
  NotificationService.$inject = ['$http', '$q', '$filter'];
  
  function NotificationService($http, $q, $filter) {
    
  var service = {
    deleteNotification: deleteNotification,
    postNotification: postNotification
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
    
  function postNotification(survey) {
    notification.creationDate = $filter('date')(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/notifications/" + survey.id,
        data: notifications
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