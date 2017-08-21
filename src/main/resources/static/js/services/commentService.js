(function(){
  angular.module('app')
   .factory('CommentService', CommentService);
  
  CommentService.$inject = ['$http', '$q', '$filter'];
  
  function CommentService($http, $q, $filter) {
    
    var service = {
      postComment: postComment,
      deleteComment: deleteComment
    }
    return service;
    
 function postComment(survey, comment) {
      comment.creationDate = $filter('date')(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/comment/" + survey.id,
        data: comment
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to post a comment");
      });
      return def.promise;
    }
    
    function deleteComment(id) {
      var def = $q.defer();
      var req = {
        method: 'DELETE',
        url: "/api/comment/" + id
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to delete a comment");
      });
      return def.promise;
    }
  }
}());