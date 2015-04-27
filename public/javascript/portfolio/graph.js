app.service('graph', function() {

    var legendColums = 2;
    var top = -100
    var radius = 3 / 8;
    var left = -400;
    var right = 0;

    if (screen.width > 980) {

        legendColums = 4;
        top = -60;

        if (screen.height > 750) {

            top = -100;
        }



    } else if (screen.width > 700) {

        legendColums = 4;
        top = -40;
    } else if (screen.width > 660) {

        legendColums = 3;
    } else if (screen.width > 400) {

        legendColums = 3;
        top = 20;
        left = -350;
        radius = 3 / 4;

        if (screen.height < 800) {
            legendColums = 4;
            top = -300;
            left = -500;

            radius = 1 / 16;



        }

    }
    if (screen.height < 500) {

        top = -30;
    }


    this.test = function() {

    };

    this.element = $('#plotDiv');

    this.data = [];
    this.options = {

        series: {
            pie: {
                show: true,
                radius: radius,
                label: {
                    show: false

                },
                offset: {
                    left: left,
                    right: right,
                    top: top


                }
            }
        },
        legend: {
            noColumns: legendColums,
            container: '#chartLegend'
        }

    };


    this.plot = function(element, data, options) {

        $.plot(element, data, options);
    }



});