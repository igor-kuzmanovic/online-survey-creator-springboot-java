(function () {
  angular.module('app')
    .controller('SurveyResultsController', SurveyResultsController);

  SurveyResultsController.$inject = ['SurveyService', 'CommentService', 'UserService', '$routeParams', '$location', '$scope'];

  function SurveyResultsController(SurveyService, CommentService, UserService, $routeParams, $location, $scope) {

    var self = this;
    self.getCurrentSurvey = getCurrentSurvey;
    self.generateBarChart = generateBarChart;
    self.generatePieChart = generatePieChart;
    self.reportComment = reportComment;
    self.allComments = [];

    init();

    function init() {
      if (!$scope.mc.checkUser()) {
        $location.path('/');
      }

      self.surveyHashedId = $routeParams.hashedId;
      getCurrentSurvey();
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
          pairUsersWithComments();
        })
    }

    function generateBarChart() {
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var resultsData = [['Submitter','Times submitted'], ['Registered user',0], ['Anonymous',0]];

        for(i = 0; i < self.survey.results.length; i++) {
          if(self.survey.results[i].submitedBy === "anonymous") {
            resultsData[2][1]++;
          }
          else {
            resultsData[1][1]++;
          }
        }

        var data = google.visualization.arrayToDataTable(resultsData);

        var options = {
          'title':'Survey has been completed ' + self.survey.results.length + ' times',
          chartArea: {width: '50%'},
        };

        var chart = new google.visualization.BarChart(document.getElementById('chart'));
        chart.draw(data, options);
      }
    }
    
    function pairUsersWithComments() {
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

    function generatePieChart(questionIndex, questionId) {
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var resultsData = [['Option','Times picked']];

        for(i = 0; i < self.survey.questions[questionIndex].answers.length; i++) {
          resultsData.push([self.survey.questions[questionIndex].answers[i].content, 0]);
        }

        for(i = 1; i < resultsData.length; i++) {
          for(j = 0; j < self.survey.results.length; j++) {
            for(k = 0; k < self.survey.results[j].results.length; k++) {
              if(self.survey.results[j].results[k].questionId.id === questionId && self.survey.results[j].results[k].answerId.content === resultsData[i][0]) {
                resultsData[i][1]++;
              }
            }
          }
        }

        var data = google.visualization.arrayToDataTable(resultsData);

        var options = {
          'title':self.survey.questions[questionIndex].content
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart' + questionIndex));
        chart.draw(data, options);
      }
    }
    
    function reportComment(commentId) {
      // Insert reporting logic
    }

  }
})();