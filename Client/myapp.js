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

  $scope.fetch = function(input, input2){
    var obj = {title: input, location: input2}
    $http({
        method: 'POST',
        // url: 'http://127.0.0.1:3000/jobsearch',
        url: 'https://mvp-demo-ted.herokuapp.com/jobsearch',
        data: obj
    }).then(function(res){
      console.log(res.data);
      $scope.datas = res.data;
      for(var i=0; i<$scope.datas.length; i++){
        $scope.datas[i].howmuch=Number($scope.datas[i].SalaryMax.slice(1).replace(',',''))
      }
    })
  };

})

.controller('secondcontroller',function($scope, $http){
  $scope.data;
  $scope.average;

  $scope.fetchone = function(input, inputtwo){
    $scope.yoursalary = inputtwo;
    $scope.yourtitle = input;
    $scope.valid = 0;
    var obj = {title: input}
    $http({
        method: 'POST',
        // url: 'http://127.0.0.1:3000/compare',
        url: 'https://mvp-demo-ted.herokuapp.com/compare',
        data: obj
    }).then(function(res){
      $scope.data = res.data[0];
      if($scope.data == undefined){
        $scope.valid = 1;
        $scope.yoursalary = null
      }else{
        $scope.valid = 0;
        $scope.max = Number($scope.data.SalaryMax.slice(1).replace(',',''))
        $scope.min = Number($scope.data.SalaryMin.slice(1).replace(',',''))
        $scope.average = ($scope.max+$scope.min)/2; 
      } 
    })
  };
})

