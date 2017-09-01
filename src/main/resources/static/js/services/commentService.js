(function(){
  angular.module('app')
    .factory('CommentService', CommentService);

  CommentService.$inject = ['UserService', '$http', '$q', '$filter'];

  function CommentService(UserService, $http, $q, $filter) {

    var comments = [];

    var service = {
      postComment: postComment,
      deleteComment: deleteComment,
      findAllComments: findAllComments,
      getCommentsWithImage: getCommentsWithImage
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
      comment.creationDate = $filter('date')(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "/api/comment/" + survey.id,
        data: comment
      };
      $http(req).success(function (data) {
        var comment = data;
        UserService.getImageFromUrl().then(function (data, status) {
            comment.imageUrl = data;
        });
        comment.survey = survey.name;
        comments.push(comment);
        def.resolve(comment);
      })
        .error(function () {
        def.reject("Failed to post a comment");
      });
      return def.promise;
    }
    
    function getCommentsWithImage(survey) {
        var commentsFromSurvey = [];

        for(var i = 0; i < comments.length; i++) {
            if(comments[i].survey === survey) {
                commentsFromSurvey.push(comments[i]);
            }
        }

        return commentsFromSurvey;
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
  }
}());