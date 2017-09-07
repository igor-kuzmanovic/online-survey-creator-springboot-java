(function(){
  angular.module('app')
    .factory('CommentService', CommentService);

  CommentService.$inject = ['UserService', '$http', '$q'];

  function CommentService(UserService, $http, $q) {

    var service = {
      postComment: postComment,
      deleteComment: deleteComment,
      allowComment: allowComment,
      findAllComments: findAllComments
    };

    return service;
    
    function findAllComments() {
        var def = $q.defer();
        var req = {
            method: 'GET',
            url: "/api/comment/"
        };
        $http(req)
            .success(function (data) {
                def.resolve(data);
            })
            .error(function () {
                def.reject("Failed to get all comments!");
            });
        return def.promise;
    }

    function postComment(survey, comment) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/comment/" + survey.id,
        data: comment
      };
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
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to delete a comment");
      });
      return def.promise;
    }
    
    function allowComment(id) {
      var def = $q.defer();
      var req = {
        method: 'PUT',
        url: "/api/comment/" + id
      };
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to allow a comment");
      });
      return def.promise;
    }
  }
}());