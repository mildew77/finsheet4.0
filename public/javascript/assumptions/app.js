var app = angular.module('finsheet', ['hmTouchEvents', 'ngCookies', 'ui.bootstrap']);
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
})

.controller('MainCtrl', function($scope, $cookies, assumption, $timeout, $modal, errors, utilities) {
    $scope.minus = true;
    $scope.plus = true;
    $scope.assetList = [];
    $scope.label = "Percent of Portfolio";
    $scope.labelChange = function($event) {
        if ($event.type == "mouseover") {
            $scope.label = "Clear"
        } else {
            $scope.label = "Percent of Portfolio";
        }
    }
    $scope.sum = "100 %";
 


    try {
        $scope.assets = JSON.parse($cookies.assets);
        console.table($cookies.assets)
    } catch (err) {

        $scope.assets = global_assets;
    }

    for (var i = 0; i < $scope.assets.length; i++) {
        $scope.assets[i].average = "";
        $scope.assets[i].stdev = ""
        $scope.assets[i].show = true;
        var temp = {
            'Symbol': $scope.assets[i].Symbol,
            'Description': $scope.assets[i].Description
        }
        $scope.assetList.push(temp);
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
    $timeout(function() {
        var assetReturns = assumption.customReturn(global_assetsReturns);
        var assetStdev = assumption.customStdev(global_assetsReturns);
        for (var i = 0; i < assetReturns.length; i++) {
            $scope.assets[i].average = assetReturns[i].toFixed(2);
            $scope.assets[i].stdev = assetStdev[i].toFixed(2);
        };
        for (var i = 0; i < $scope.assets.length; i++) {
            for (var m = 0; m < $scope.assets.length; m++) {
                if ($scope.assets[m].Description == $scope.assets[i].Description) {
                    $scope.assets[i][$scope.assets[m].Description] = 1;
                } else {


                    try {
                        $scope.assets[i][$scope.assets[m].Description] = assumption.correlation(global_assetsReturns[i + 1], global_assetsReturns[m + 1]);
                    } catch (err) {
                        console.log(err.message)
                    }
                }
            }
        }

        $scope.portReturn = assumption.portfolioReturn($scope.assets);
        $scope.portStdev = assumption.portfolioStDev($scope.assets);

    }, 500).then(function() {

        if ($scope.portReturn == 0) {
            $timeout(function() {
                var assetReturns = assumption.customReturn(global_assetsReturns);
                var assetStdev = assumption.customStdev(global_assetsReturns);
                for (var i = 0; i < assetReturns.length; i++) {
                    $scope.assets[i].average = assetReturns[i].toFixed(2);
                    $scope.assets[i].stdev = assetStdev[i].toFixed(2);
                };
                for (var i = 0; i < $scope.assets.length; i++) {
                    for (var m = 0; m < $scope.assets.length; m++) {

                        if ($scope.assets[m].Description == $scope.assets[i].Description) {
                            $scope.assets[i][$scope.assets[m].Description] = 1;
                        } else {


                            try {
                                $scope.assets[i][$scope.assets[m].Description] = assumption.correlation(global_assetsReturns[i + 1], global_assetsReturns[m + 1]);
                            } catch (err) {
                                console.log(err.message)
                            }
                        }
                    }
                }
                $scope.portReturn = assumption.portfolioReturn($scope.assets);
                $scope.portStdev = assumption.portfolioStDev($scope.assets);
            }, 300)
        }
    })



    $scope.corrUpdate = function() {
        var placedValue = this.$parent.assets[this.list.Description];
        var assetA = this.assets.Description;
        var assetB = this.list.Description;
        if (placedValue > 1) {
            placedValue = 1
        };
        if (placedValue < -1) {
            placedValue = -1
        };
        if (assetA == assetB) {
            placedValue = 1
        };
        for (i = 0; i < $scope.assets.length; i++) {
            if ($scope.assets[i].Description == assetA) {
                $scope.assets[i][assetB] = placedValue / 1;

            }
            if ($scope.assets[i].Description == assetB) {
                $scope.assets[i][assetA] = placedValue / 1;;
            }
        }

        $scope.portReturn = assumption.portfolioReturn($scope.assets);
        $scope.portStdev = assumption.portfolioStDev($scope.assets);
        utilities.safeApply();

    }

    $scope.summation = function() {
        var localSum = 0;
        for (i = 0; i < $scope.assets.length; i++) {
            localSum += $scope.assets[i].Percent / 1;
        }
        if (localSum == 100) {
            $('.assetPercent').removeClass("error");
            $('.sums').removeClass('info');
            $scope.portReturn = assumption.portfolioReturn($scope.assets);
            $scope.portStdev = assumption.portfolioStDev($scope.assets);

        } else {
            $('.assetPercent').addClass("error")
            $('.sums').addClass('info')
            $scope.portReturn = 0;
            $scope.portStdev = 0;
        };

        $scope.sum = localSum + " %";
    }
    $scope.zero = function() {
        for (i = 0; i < $scope.assets.length; i++) {
            $scope.assets[i].Percent = 0;
        }
        $scope.summation();
        $timeout(function() {
            $('.assetPercent').each(function() {
                this.value = "0.00 %"

            })
        }, 500)

    }

    $scope.plusMinus = function() {
        $scope.plus = true;
        $scope.minus = true;

        for (i = 0; i < $scope.assets.length; i++) {
            if ($scope.assets[i].Percent == 0) {
                $scope.minus = false;

            }

        }
        $scope.summation();

    }

    $scope.plusAction = function() {

        $scope.minus = false;
        $scope.plus = true;
        for (i = 0; i < $scope.assets.length; i++) {
            $scope.assets[i].show = true;

        }


    }
    $scope.minusAction = function() {
        $scope.minus = true;
        $scope.plus = false;
        for (i = 0; i < $scope.assets.length; i++) {
            if ($scope.assets[i].Percent == 0) {
                $scope.assets[i].show = false;

            }

        }


    }


    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                                                Calendar Starts Here


*/ ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var startMonth, startYear, endMonth, endYear, startEnd;
    $timeout(function() {
        startMonth = moment(global_assetsReturns[0][global_assetsReturns[0].length - 1]).month() + 1;
        startYear = moment(global_assetsReturns[0][global_assetsReturns[0].length - 1]).year();
        endMonth = moment(global_assetsReturns[0][0]).month() + 1;
        endYear = moment(global_assetsReturns[0][0]).year();



        $scope.startMonth = months[startMonth];
        $scope.startYear = startYear;
        $scope.endMonth = months[endMonth];
        $scope.endYear = endYear;

        for (i = startYear; i <= endYear; i++) {
            $scope.years.push(i);
        }
       
    }, 800)

    /*////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                                                Calendar Modal starts Here


*/ ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var months = [0, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $scope.calendarError ="error warning";
   
   
    $scope.objects = [{
        "text": "Jan"
    }, {
        "text": "Feb"
    }, {
        "text": "Mar"
    }, {
        "text": "Apr"
    }, {
        "text": "May"
    }, {
        "text": "Jun"
    }, {
        "text": "Jul"
    }, {
        "text": "Aug"
    }, {
        "text": "Sep"
    }, {
        "text": "Oct"
    }, {
        "text": "Nov"
    }, {
        "text": "Dec"
    }];
    $scope.startEnd = "";
    $scope.years = [];

    $scope.open = function(startEnd) {
        $scope.startEnd = startEnd;
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'sm',
            resolve: {

                objects: function() {
                    return $scope.objects;
                },
                startEnd: function() {
                    return $scope.startEnd;
                },
                years: function() {
                    return $scope.years;
                },
                yearSelect: function() {
                    if($scope.startEnd == "Start"){
                    $scope.yearSelect = $scope.startYear
                    }else{
                    $scope.yearSelect = $scope.endYear
                    }
                    return $scope.yearSelect;
                    
                }

            }
        });

        modalInstance.result.then(function(data) {

            try{
                if (startEnd == "Start") {
                if( data[1] > $scope.endYear || ( data[1]  == $scope.endYear && months.indexOf(data[0]) >= months.indexOf($scope.endMonth) )){                 
                    throw "The start date cannot be greater or equal to the end date";                  
                }
                $scope.startMonth = data[0];
                $scope.startYear = data[1];
                    } else {
                  if( data[1] < $scope.startYear || ( data[1]  == $scope.startYear && months.indexOf(data[0]) <= months.indexOf($scope.startMonth) )){
                    throw "The end date cannot be less than or equal to the start date";
                }     
                $scope.endMonth = data[0];
                $scope.endYear = data[1];       
                    }
            }      
                    catch(err){
                        errors.errorMessage("calendarError",err);
                    }
        }, function() {

        });
    };



});

app.controller('ModalInstanceCtrl', function($scope, $modalInstance, objects, startEnd, years, yearSelect) {
    $scope.objects = objects;
    $scope.startEnd = startEnd
    $scope.years = years;
    $scope.yearSelect = yearSelect;
    $scope.row1 = function(obj, idx) {
        obj._index = idx;
        return (obj._index < 4);
    }
    $scope.row2 = function(obj, idx) {
        obj._index = idx;
        return (obj._index < 8 && obj._index > 3);
    }
    $scope.row3 = function(obj, idx) {
        obj._index = idx;
        return (obj._index < 13 && obj._index > 7);
    }
    $scope.ok = function(data) {
        $modalInstance.close(data, 500);
    };
});