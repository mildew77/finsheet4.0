var app = angular.module('finsheet', ['hmTouchEvents', 'ngCookies']);
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');

})

.controller('MainCtrl', function($scope, graph, $cookies) {


    $scope.name = 'World';
    $scope.onHammer = function onHammer(event) {

        event.element[0].className = event.element[0].className + " displayNone"
        console.log(event.element[0].className)

    };
    $scope.swipeRight = function swipeRight(event) {
        $('#graphHold').show("slow");
        $('#portfolioHold').hide("slow");
    };
    $scope.swipeLeft = function swipeLeft(event) {
        $('#portfolioHold').show("slow");
        $('#graphHold').hide("slow");
    };

    $scope.sum = "100 %";

    $scope.summation = function() {
        var localSum = 0;
        for (i = 0; i < $scope.assets.length; i++) {

            localSum += $scope.assets[i].Percent / 1;
        }

        if (localSum == 100) {
            $('.portSumHold').removeClass("error");
            $('.percentInput').removeClass("error");
        } else {
            $('.portSumHold').addClass("error")
            $('.percentInput').addClass("error");
        };

        $scope.sum = localSum + " %";

        $scope.updateGraph();
    }

    $scope.number = "Test";




    $scope.updateGraph = function() {

        $scope.update();
        graph.plot(graph.element, graph.data, graph.options);


    };



    $scope.update = function() {

        graph.data = [];
        for (var i = $scope.assets.length - 1; i >= 0; i--) {
            if ($scope.assets[i].Percent > 0) {
                graph.data.push({
                    label: $scope.assets[i].Description,
                    data: parseFloat($scope.assets[i].Percent)
                })
            };


        };


    };




    $scope.assets = [{
        'Symbol': 'vfinx',
        'Description': 'Large Cap Blend',
        'Color': '#CCCCEB',
        'Percent': 5
    }, {
        'Symbol': 'vigrx',
        'Description': 'Large Cap Growth',
        'Color': '#9999D6',
        'Percent': 5
    }, {
        'Symbol': 'veipx',
        'Description': 'Large Cap Value',
        'Color': '#8080CC',
        'Percent': 5
    }, {
        'Symbol': 'nctwx',
        'Description': 'Mid Cap Growth',
        'Color': '#4D4DB8',
        'Percent': 5
    }, {
        'Symbol': 'fdvlx',
        'Description': 'Mid Cap Value',
        'Color': '#1919A3',
        'Percent': 5
    }, {
        'Symbol': 'naesx',
        'Description': 'Small Cap ',
        'Color': '#00008A',
        'Percent': 5
    }, {
        'Symbol': 'vwigx',
        'Description': 'Foreign Stocks',
        'Color': '#00006B',
        'Percent': 5
    }, {
        'Symbol': 'femkx',
        'Description': 'Emerging Market Stock',
        'Color': '#00004C',
        'Percent': 5
    }, {
        'Symbol': 'fresx',
        'Description': 'REIT',
        'Color': '#A366FF',
        'Percent': 5
    }, {
        'Symbol': 'gld',
        'Description': 'Gold',
        'Color': '#FFFF00',
        'Percent': 5
    }, {
        'Symbol': 'vsgbx',
        'Description': 'Short Term Treasury',
        'Color': '#F8D0D8',
        'Percent': 5
    }, {
        'Symbol': 'fstgx',
        'Description': 'Intermediate Treasury',
        'Color': '#F1A1B1',
        'Percent': 5
    }, {
        'Symbol': 'vustx',
        'Description': 'Long Term Treasury',
        'Color': '#E02B50',
        'Percent': 5
    }, {
        'Symbol': 'vwesx',
        'Description': 'Corporate Bond',
        'Color': '#DC143C',
        'Percent': 5
    }, {
        'Symbol': 'vwehx',
        'Description': 'High Yield Bond',
        'Color': '#9A0E2A',
        'Percent': 5
    }, {
        'Symbol': 'usstx',
        'Description': 'Short Term Municipal Bonds',
        'Color': '#FFEBD6',
        'Percent': 5
    }, {
        'Symbol': 'vwitx',
        'Description': 'Intermediate Municipal Bonds',
        'Color': '#FFD6AD',
        'Percent': 5
    }, {
        'Symbol': 'fhigx',
        'Description': 'Long Term Municipal Bonds',
        'Color': '#FFC285',
        'Percent': 5
    }, {
        'Symbol': 'rpibx',
        'Description': 'International Bond',
        'Color': '#B01030',
        'Percent': 5
    }, {
        'Symbol': 'fnmix',
        'Description': 'Emerging Market Bond',
        'Color': '#6E0A1E',
        'Percent': 5
    }];

    $cookies.assets = '';

    $scope.$watch('assets', function() {
        if ($scope.sum == "100 %") {

            $cookies.assets = JSON.stringify($scope.assets);
            //JSON.parse($scope.assets) to reverse;


        }

    }, true);


    //used to test if cookie is present
    $scope.testing = function() {



        var assetObject = JSON.parse($cookies.assets)

        console.log(assetObject)

    }






});