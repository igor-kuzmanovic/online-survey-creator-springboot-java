(function () {
  angular.module('app')
    .controller('SurveyResultsController', SurveyResultsController);

  SurveyResultsController.$inject = ['SurveyService', 'NotificationService', 'UserService', 'ImageService', '$routeParams', '$location', '$scope'];

  function SurveyResultsController(SurveyService, NotificationService, UserService, ImageService, $routeParams, $location, $scope) {

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
      else {
        self.surveyHashedId = $routeParams.hashedId;
        getCurrentSurvey();
      }
    }
    
    function loadImages() {
        ImageService.getAllImagesBinary().then(function (data, status) {
          self.allComments = self.survey.comments;
          for(var i = 0; i < self.allComments.length; i++) {
            console.log(self.allComments);
            self.allComments[i].image = data[self.allComments[i].poster];
          }
        });
    }

    function getCurrentSurvey() {
      SurveyService.getCurrentSurvey(self.surveyHashedId)
        .then(
        function(response){
          self.survey = response;
          loadImages();
          if($routeParams.elementId) {
            setTimeout(function () {
              document.getElementById('comment' + $routeParams.elementId).setAttribute('style', 'border:solid');
              document.getElementById('comment' + $routeParams.elementId).scrollIntoView('smooth');
              
              if(document.body.scrollTop < 507) {
                document.body.scrollTop -= 100;
              }
              else {
                document.body.scrollTop += 100;
              }
            }, 500);
          }
        },
        function(error){
          console.log(error);
          self.initError = error;
        });
    }

    function generateBarChart() {
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var resultsData = [['Submitter','Times submitted'], ['Registered user',0], ['Anonymous',0]];

        for(i = 0; i < self.survey.surveyResults.length; i++) {
          if(self.survey.surveyResults[i].submitedBy === "anonymous") {
            resultsData[2][1]++;
          }
          else {
            resultsData[1][1]++;
          }
        }

        var data = google.visualization.arrayToDataTable(resultsData);

        var options = {
          'title':'Survey has been completed ' + self.survey.surveyResults.length + ' times',
          chartArea: {width: '50%'},
        };

        var chart = new google.visualization.BarChart(document.getElementById('chart'));
        chart.draw(data, options);
      }
    }

    function generatePieChart(questionIndex, questionId) {
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var resultsData = [['Option','Times picked']];

        for(i = 0; i < self.survey.questions[questionIndex].answers.length; i++) {
          resultsData.push([self.survey.questions[questionIndex].answers[i], 0]);
        }

        if(self.survey.questions[questionIndex].hasOtherOption) {
          resultsData.push([{
            id: 0,
            content: "Other"
          }, 0]);
        }

        for(i = 1; i < resultsData.length; i++) {
          for(j = 0; j < self.survey.surveyResults.length; j++) {
            for(k = 0; k < self.survey.surveyResults[j].results.length; k++) {
              if(self.survey.surveyResults[j].results[k].questionId === questionId && self.survey.surveyResults[j].results[k].answerId === resultsData[i][0].id) {
                resultsData[i][1]++;
              }
            }
          }

          resultsData[i][0] = resultsData[i][0].content;
        }

        console.log(resultsData);

        var data = google.visualization.arrayToDataTable(resultsData);

        var options = {
          'title':self.survey.questions[questionIndex].content
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart' + questionIndex));
        chart.draw(data, options);
      }
    }

    function reportComment(commentId) {
      NotificationService.reportCommentNotification(commentId)
        .then(function(response){}, function(error){
        console.log(error);
        self.error = error;
      })
    }

  }
})();