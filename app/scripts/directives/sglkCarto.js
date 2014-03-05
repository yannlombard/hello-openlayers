'use strict';

app.directive('sglkCarto',function ($q) {
    return {
        restrict    : 'A',
        templateUrl : 'views/carto.html',
        transclude  : true,
        replace     : true,
        scope       : {
            map    : "=ngModel",
            getMap : "="
        },
        controller  : function ($scope) {
            var olMap;

            var self = this;

            olMap = new OpenLayers.Map();

            $scope.layers = [];
            $scope.baseLayers = [];

            this.addLayer = function (layer, isBaseLayer) {

                if(isBaseLayer) {
                    $scope.baseLayers.push(layer);
                } else {
                    $scope.layers.push(layer);
                }

                olMap.addLayer(layer.object);

                // set zindex
                if(angular.isUndefined(layer.ngModel.zindex)) {
                    layer.ngModel.zindex = olMap.getLayerIndex(layer.object);
                }

                self.updateLayer(layer);
            };

            this.removeLayer = function (layer, isBaseLayer) {

                if(isBaseLayer) {
                    $scope.baseLayers.pop(layer);
                } else {
                    $scope.layers.pop(layer);
                }

                olMap.removeLayer(layer.object);
            };

            this.updateLayer = function (layer) {

                var params = layer.ngModel;

                layer.object.setOpacity(params.opacity);
                layer.object.setVisibility(params.visible);
                olMap.setLayerIndex(layer.object, params.zindex);

                if(params.isBaseLayer) {
                    olMap.setCenter(new OpenLayers.LonLat(-100, 40), 3);
                }

            };

            $scope.olMap = olMap;

        },
        link        : function (scope, element, attrs) {
            var olMap = scope.olMap;

            olMap.render(element.find('.mapWrapper')[0]);
            console.log(olMap);

            //scope.getMap(olMap);
            scope.map = olMap;

            // sortable Options
            scope.sortableOptions = {
                axis   : 'y',
                update : function (e, ui) {

                },
                stop   : function (e, ui) {

                    angular.forEach(scope.layers, function (layer, index) {
                        layer.ngModel.zindex = index;
                    });

                    scope.$digest();
                }
            };

        }
    };

}).directive('sglkLayer', function () {

        return {
            require  : '^sglkCarto',
            restrict : 'A',
            scope    : {
                ngModel : '='
            },
            link     : function postLink(scope, element, attrs, sglkCartoCtrl) {

                var params = scope.ngModel;

                if(angular.isUndefined(params.opacity)) {
                    params.opacity = 1;
                }

                if(angular.isUndefined(params.visible)) {
                    params.visible = true;
                }

                switch (params.type) {
                    /*case 'google':

                     scope.object = new OpenLayers.Layer.Google(params.title, {
                     numZoomLevels : params.numZoomLevels
                     });

                     break;
                     case 'osm':

                     scope.object = new OpenLayers.Layer.OSM(params.title, params.arrayOSM, {
                     isBaseLayer : params.isBaseLayer
                     });

                     break;*/
                    default:
                        scope.object = new OpenLayers.Layer.WMS(params.title, params.url, {
                            layers      : params.layers,
                            transparent : params.transparent,
                            format      : params.format
                        }, {
                            isBaseLayer : params.isBaseLayer
                        });

                }

                sglkCartoCtrl.addLayer(scope, angular.isDefined(attrs.isBaseLayer));

                scope.$watch('ngModel', function () {
                    sglkCartoCtrl.updateLayer(scope);
                }, true);

                scope.$on("$destroy", function () {
                    sglkCartoCtrl.removeLayer(scope, angular.isDefined(attrs.isBaseLayer));
                });
            }
        };
    });