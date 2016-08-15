var FormControl = angular.module('BusApp', ['ngMaterial']);

FormControl.controller('MTDCtrl', function ($scope, $http, $window) {
    var i;

    $scope.check=function(){
        console.log("SUBMIT");
    };
    $scope.change=function()
    {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://www.cumtd.com/autocomplete/Stops/v1.0/json/search?query=" +encodeURI($scope.stop),
            "method": "GET"

        }
        $.ajax(settings).done(function (response) {
            //console.log($scope.stop);
            $scope.auto=response;
            $scope.$apply();
        });
    };

    $scope.check=function(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://www.cumtd.com/autocomplete/Stops/v1.0/json/search?query=" +encodeURI($scope.stop),
            "method": "GET"

        }
        $.ajax(settings).done(function (response) {
            //console.log($scope.stop);
            if(response.length==0)
            {
                alert("Stop Not Found");
            }
            else{
                for(i=0; i<response.length; i++){
                    if($scope.stop==response[i].n){
                        $scope.id=response[i].i;
                    }

                }
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://developer.cumtd.com/api/v2.2/json/GetDeparturesByStop?key=ff42ad99dc8a494581bb365eb84e848c&stop_id="+$scope.id,
                "method": "GET"
            }

            $.ajax(settings).done(function (response) {
                $scope.buses=response;
                $scope.found=true;
                if($scope.buses.departures.length==0){
                    $scope.empty=true;
                }

            });


        });





    };

    $scope.isEmpty=function(){
        return $scope.stop==''||$scope.stop==null;
    }


});


