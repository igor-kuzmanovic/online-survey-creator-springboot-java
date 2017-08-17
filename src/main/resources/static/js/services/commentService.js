(function(){
  angular.module('app')
   .factory('CommentService', CommentService);
  
  CommentService.$inject = ['$http', '$q'];
  
  function CommentService($http, $q) {
    
    var service = {
      postComment: postComment,
      deleteComment: deleteComment
    }
    return service;
    
 function postComment(surveys, comment) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "comments/" + survey.id,
        data: {"content": comment}
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
        url: "comments/" + id
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