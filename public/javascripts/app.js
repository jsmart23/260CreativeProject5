angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.rsvp = [];
    $scope.comments = [];
    $scope.addComment = function() {
      var newcomment = {title:$scope.formContent,upvotes:0, rsvp:$scope.formContent };
      $scope.formContent='';
      $http.post('/comments', newcomment).success(function(data){
        $scope.comments.push(data);
      });
    };
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(comment) {
	  $scope.upvote(comment);
    };
    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
    $scope.getAll();
    
    $scope.delete = function(comment) {
       $http.delete('/comments/' + comment._id )
          .success(function(data){
            console.log("delete worked");
          });
          $scope.getAll();
    };

    $scope.addRSVP = function(comment){
      
         var newcomment = {comment, upvotes:0};
           console.log("got HERE");
           $http.post('/rsvp', newcomment).success(function(data){
               $scope.comments.push(data);
           });    
	

    };
  }
]);
