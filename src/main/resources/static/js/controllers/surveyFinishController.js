(function() {
  angular.module('app')
      .controller('SurveyFinishController', SurveyFinishController);

  SurveyFinishController.$inject = ['SurveyService', 'CommentService', 'UserService', '$location', '$routeParams', '$scope'];

  function SurveyFinishController(SurveyService, CommentService, UserService, $location, $routeParams, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.postComment = postComment;
    self.deleteComment = deleteComment;
    self.reportComment = reportComment;

    self.allComments = [];
    self.user = {};
    self.comment = {};

    init();

    function init() {
        $scope.mc.getImage();
        self.user = $scope.mc.checkUser();
        self.surveyHashedId = $routeParams.hashedId;
        getCurrentSurvey();
    }
    
    function pairUsersWithImages() {
        UserService.getUsersForComments(self.survey.id).then(function (data, status) {
            self.users = data;
            for(var i = 0; i < self.survey.comments.length; i++) {
                for(var j = 0; j < self.users.length; j++) {
                    if(self.survey.comments[i].poster === self.users[j].username) {
                        self.survey.comments[i].image = self.users[j].imageUrl;
                        self.allComments.push(self.survey.comments[i]);
                    }
                }
            }
        });
    }

    function getCurrentSurvey() {
        SurveyService.getCurrentSurvey(self.surveyHashedId).then(
                function(response){
                  self.survey = response;
                  checkSurvey();
                  self.allComments = [];
                  pairUsersWithImages();
                })
    }

    function checkSurvey() {
        if(self.survey.isActive) {
            if(self.user && self.survey.creator === self.user.username) {
                window.alert("You cannot complete your own survey!");
                $location.path('/home');
            }
        }
        else {
            window.alert("This survey is not active!");
            $location.path('/survey/details/' + self.surveyHashedId);
        }
    }

    function postComment() {
        CommentService.postComment(self.survey, self.comment).then(function(response) {
            getCurrentSurvey();
            self.comment = {};

        }, function(error){
            console.log(error);
        })
    }

    function deleteComment(commentId){
        CommentService.deleteComment(commentId).then(function(response){
            getCurrentSurvey();
        }, function(error){
            console.log(error);
        })
    }

    function reportComment(commentId) {
        // Insert reporting logic
    }
  }
})();