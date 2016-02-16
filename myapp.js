angular.module('myApp', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/compare', {
      templateUrl: './Compare.html',
      controller: 'secondcontroller'
    })
    .when('/jobsearch',{
      templateUrl:'./jobsearch.html',
      controller: 'maincontroller'
    })
    .otherwise({
        redirectTo: '/compare'
    });
})

.controller('maincontroller', function($scope, $http){

  $scope.datas = {};

  $scope.fetch = function(input){
    var obj = {title: input}
    $http({
        method: 'POST',
        url: 'http://127.0.0.1:3000',
        data: obj
    }).then(function(res){
      console.log(res)
      $scope.datas = res.data;
    })
  };

})

.controller('secondcontroller',function($scope, $http){
  $scope.data;
  $scope.average;

  $scope.fetchone = function(input, inputtwo){
    $scope.yoursalary = inputtwo;
    $scope.yourtitle = input;
    var obj = {title: input}
    $http({
        method: 'POST',
        url: 'http://127.0.0.1:3000',
        data: obj
    }).then(function(res){
      $scope.data = res.data[0];
      $scope.max = Number($scope.data.SalaryMax.slice(1).replace(',',''))
      $scope.min = Number($scope.data.SalaryMin.slice(1).replace(',',''))
      $scope.average = ($scope.max+$scope.min)/2;  
    })
  };
})

