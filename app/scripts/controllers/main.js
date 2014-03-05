'use strict';

app.controller('MainCtrl', function ($scope) {

    $scope.baseLayers = [
        {
            type        : 'wms',
            url         : 'http://vmap0.tiles.osgeo.org/wms/vmap0',
            title       : 'WMS Ground',
            isBaseLayer : true,
            opacity     : 1,
            layers      : 'ground_01'
        }
    ];

    $scope.layers = [
        {
            type        : 'wms',
            url         : 'http://vmap0.tiles.osgeo.org/wms/vmap0',
            title       : 'WMS Coastline',
            isBaseLayer : false,
            opacity     : 0.5,
            layers      : 'coastline_01'
        }
    ];

    $scope.baseLayers2 = angular.copy($scope.baseLayers);
    $scope.layers2 = angular.copy($scope.layers);

    /*$scope.map.then(function(map) {

        console.log('MAP from mainCtrl', map);

    });*/

    $scope.getMap1 = function(map) {
        //console.log('GET MAP 1', map);
    };

    $scope.getMap2 = function(map) {
        //console.log('GET MAP 2', map);
    };

    $scope.$watch('map', function(map) {

        //console.log('MAP from mainCtrl', $scope.map);
    });

    /*$scope.test = {
        type        : 'wms',
        url         : 'http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi',
        title       : 'Nexrad',
        isBaseLayer : false,
        opacity     : 0.5,
        format      : 'image/png',
        transparent : true,
        layers      : 'nexrad-n0r'
    };*/

});

app.controller('module1Ctrl', function($scope) {

    $scope.layer = {
        type        : 'wms',
        url         : 'http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi',
        title       : 'Nexrad',
        isBaseLayer : false,
        opacity     : 0.5,
        format      : 'image/png',
        transparent : true,
        layers      : 'nexrad-n0r'
    };

    $scope.customLayers = [];

    $scope.addLayer = function(layers) {
        var newLayer = angular.copy($scope.layer);

        $scope.customLayers.push(newLayer);
        layers.push(newLayer);
    };

    $scope.removeLayer = function(layers, index) {

        var remLayer = $scope.customLayers[index];
        layers.pop(remLayer);
        $scope.customLayers.pop(remLayer);
    };

    //console.log('MAP from moduleCtrl', $scope.map);
    $scope.$watch('map', function() {
        //console.log('MAP from moduleCtrl', $scope.map);
    });
});