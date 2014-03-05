'use strict';

app.controller('MainCtrl', function ($scope) {

    $scope.baseLayers = [
        {
            type    : 'wms',
            url     : 'http://vmap0.tiles.osgeo.org/wms/vmap0',
            title   : 'WMS Ground',
            params  : {
                layers  : 'ground_01',
                visible : true,
                opacity : 1
            },
            options : {
                isBaseLayer : true
            }
        }
    ];

    $scope.layers = [
        {
            type    : 'wms',
            url     : 'http://vmap0.tiles.osgeo.org/wms/vmap0',
            title   : 'WMS Coastline',
            params  : {
                layers  : 'coastline_01',
                visible : true,
                opacity : 0.5
            },
            options : {
                isBaseLayer : false
            }
        }
    ];

    $scope.baseLayers2 = angular.copy($scope.baseLayers);
    $scope.layers2 = angular.copy($scope.layers);

    /*$scope.map.then(function(map) {

     console.log('MAP from mainCtrl', map);

     });*/

    $scope.getMap1 = function (map) {
        //console.log('GET MAP 1', map);
    };

    $scope.getMap2 = function (map) {
        //console.log('GET MAP 2', map);
    };

    $scope.$watch('map', function (map) {

        //console.log('MAP from mainCtrl', $scope.map);
    });

});

app.controller('module1Ctrl', function ($scope, $timeout) {

    $scope.layer = {
        type    : 'wms',
        url     : 'http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi',
        title   : 'Nexrad',
        params  : {
            layers      : 'nexrad-n0r',
            transparent : true,
            opacity     : 0.5,
            format      : 'image/png'
        },
        options : {
            isBaseLayer : false
        }
    };

    $scope.customLayers = [];

    $scope.addLayer = function (layers) {
        var newLayer = angular.copy($scope.layer);

        $scope.customLayers.push(newLayer);
        layers.push(newLayer);
    };

    $scope.removeLayer = function (layers, index) {

        var remLayer = $scope.customLayers[index];
        layers.pop(remLayer);
        $scope.customLayers.pop(remLayer);
    };

    $timeout(function () {
        $scope.map1isReady();
    }, 1000);
});