var app = angular.module('finsheet', ['hmTouchEvents', 'ngCookies']);
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');

})

.controller('MainCtrl', function($scope,$cookies,assumption,$timeout) {
   

   $scope.assets =  JSON.parse($cookies.assets) || global_assets;
   for (var i = 0; i < $scope.assets.length; i++) {
       $scope.assets[i].average="";
       $scope.assets[i].stdev=""
	   $scope.assets[i].show=true;
   };

  $scope.assetsReturns = assumption.getReturnData($scope.assets);


   
   $scope.swipeRight = function swipeRight(event) {
        $('#assumptionCorrelations').show("slow");
        $('#assumptionReturns').hide("slow");
    };
    $scope.swipeLeft = function swipeLeft(event) {
        $('#assumptionReturns').show("slow");
        $('#assumptionCorrelations').hide("slow");
    };

    $timeout(function(){
var assetReturns =assumption.customReturn(global_assetsReturns);
var assetStdev =assumption.customStdev(global_assetsReturns);
for (var i = 0; i < assetReturns.length; i++) {
     $scope.assets[i].average = assetReturns[i].toFixed(2);
     $scope.assets[i].stdev = assetStdev[i].toFixed(2);
};

console.log($scope.assets);
    },500)
	
	
$scope.testing = function() {



        var assetObject = JSON.parse($cookies.assets)

        console.log( assumption.customReturn(global_assetsReturns) );

    }

   



});