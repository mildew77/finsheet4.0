var app = angular.module('finsheet', ['hmTouchEvents', 'ngCookies']);
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');

})

.controller('MainCtrl', function($scope,$cookies,assumption,$timeout) {
    
	$scope.assetList=[];
  $scope.label ="Percent of Portfolio";	 
  $scope.labelChange = function($event){
  if($event.type=="mouseover"){
  $scope.label="Clear"
  }
  else{
   $scope.label="Percent of Portfolio";
  }
  }
  $scope.sum  = "100 %";
  $scope.safeApply = function(fn) { var phase = this.$root.$$phase; if(phase == '$apply' || phase == '$digest') { if(fn) fn(); } else { this.$apply(fn); } };

try {
   $scope.assets = JSON.parse($cookies.assets);
}
catch(err) {
    $scope.assets = global_assets;
}

   for (var i = 0; i < $scope.assets.length; i++) {
       $scope.assets[i].average="";
       $scope.assets[i].stdev=""
	   $scope.assets[i].show=true;
	   var temp = {
        'Symbol': $scope.assets[i].Symbol,
        'Description': $scope.assets[i].Description
            }
		$scope.assetList.push(temp);	
	  /*  $scope.assetList[i].Description=$scope.assets[i].Description;
	    $scope.assetList[i].Symbol=$scope.assets[i].Symbol; */
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
//initialize returns, standard deviations and correlations
    $timeout(function(){
	
var assetReturns =assumption.customReturn(global_assetsReturns);
var assetStdev =assumption.customStdev(global_assetsReturns);
for (var i = 0; i < assetReturns.length; i++) {
     $scope.assets[i].average = assetReturns[i].toFixed(2);
     $scope.assets[i].stdev = assetStdev[i].toFixed(2);
	};
for (var i = 0; i < $scope.assets.length; i++){
for(var m = 0; m < $scope.assets.length; m++){

if($scope.assets[m].Description == $scope.assets[i].Description){
$scope.assets[i][$scope.assets[m].Description]=1;
}
else{


try {
   $scope.assets[i][$scope.assets[m].Description]=assumption.correlation(global_assetsReturns[i+1],global_assetsReturns[m+1]);
}
catch(err) {
   console.log(err.message)
}
}
}
}

$scope.portReturn =assumption.portfolioReturn($scope.assets);
$scope.portStdev = assumption.portfolioStDev($scope.assets);
    },500)
	
	
$scope.testing = function() {
       console.log(assumption.portfolioReturn($scope.assets)) 
$scope.portReturn =assumption.portfolioReturn($scope.assets);
    }
	
	$scope.corrUpdate = function() {
	var placedValue = this.$parent.assets[this.list.Description];
	var assetA =this.assets.Description;
	var assetB =this.list.Description;
	if(placedValue>1){placedValue=1};
	if(placedValue<-1){placedValue=-1};
	if(assetA == assetB){placedValue=1};
	for(i=0;i<$scope.assets.length;i++){
	if($scope.assets[i].Description==assetA){$scope.assets[i][assetB]=placedValue/1;
	
	}
	if($scope.assets[i].Description==assetB){$scope.assets[i][assetA]=placedValue/1;
	;
	}
	}

$scope.portReturn =assumption.portfolioReturn($scope.assets);
$scope.portStdev = assumption.portfolioStDev($scope.assets); 
 $scope.safeApply();
console.log($scope.portStdev);
    }

	    $scope.summation = function() {
        var localSum = 0;
        for (i = 0; i < $scope.assets.length; i++) {
            localSum += $scope.assets[i].Percent / 1;
        }
        if (localSum == 100) {
            $('.assetPercent').removeClass("error");
			$('.sums').removeClass('info');
			$scope.portReturn =assumption.portfolioReturn($scope.assets);
			$scope.portStdev = assumption.portfolioStDev($scope.assets);
            
			} else {
            $('.assetPercent').addClass("error")
            $('.sums').addClass('info')
			$scope.portReturn=0;
			$scope.portStdev=0;
        };
		
        $scope.sum = localSum + " %";
    }
		$scope.zero = function(){
		   for (i = 0; i < $scope.assets.length; i++) {
           $scope.assets[i].Percent = 0;		   
        }
		$scope.summation();
		$timeout(function(){
		$('.assetPercent').each(function(){
		this.value="0.00 %"
		console.log(this.value);
		})
		},500)
		
		}
   



});