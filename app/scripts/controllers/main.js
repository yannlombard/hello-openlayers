'use strict';

app.controller('MainCtrl', function ($scope) {

    $scope.baseLayers = [
        {
            type    : 'wms',
            url     : 'http://vmap0.tiles.osgeo.org/wms/vmap0',
            title   : 'WMS Ground',
            params  : {
                LAYERS  : 'ground_01',
                VISIBLE : true,
                OPACITY : 1
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
                LAYERS  : 'coastline_01',
                VISIBLE : true,
                OPACITY : 0.5
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
            LAYERS      : 'nexrad-n0r',
            TRANSPARENT : true,
            OPACITY     : 0.5,
            FORMAT      : 'image/png'
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