'use strict';

app.directive('sglkCarto',function ($q) {
    return {
        restrict    : 'A',
        templateUrl : 'views/carto.html',
        transclude  : true,
        replace     : true,
        scope       : {
            map    : "=ngModel",
            getMap : "=",
            ready  : "="
        },
        controller  : function ($scope) {
            // init
            $scope.showMap = !!$scope.showMap;

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


                // set default value if undefined
                var params = layer.ngModel.params;
                params.opacity = angular.isUndefined(params.opacity) ? 1 : params.opacity;
                params.visible = angular.isUndefined(params.visible) ? true : params.visible;

                // set zindex
                if(angular.isUndefined(layer.ngModel.zindex)) {
                    layer.ngModel.zindex = olMap.getLayerIndex(layer.object);
                }


                self.updateLayer(layer);
            };

            this.removeLayer = function (layer, isBaseLayer) {

                var remove = function(ar, obj) {
                    var index = ar.indexOf(obj);
                    ar.splice(index, 1);
                    return ar;
                };


                if(isBaseLayer) {
                    $scope.baseLayers = remove($scope.baseLayers, layer);
                } else {
                    $scope.layers = remove($scope.layers, layer);
                }

                olMap.removeLayer(layer.object);
            };

            this.updateLayer = function (layer) {

                var data = layer.ngModel;

                layer.object.setOpacity(data.params.opacity);
                layer.object.setVisibility(data.params.visible);
                olMap.setLayerIndex(layer.object, data.zindex);

                if(data.options.isBaseLayer) {
                    olMap.setCenter(new OpenLayers.LonLat(-100, 40), 3);
                }

            };

            $scope.map = olMap;

        },
        link        : function (scope, element, attrs) {

            scope.render = function () {
                scope.showMap = true;
                scope.map.render(element.find('.mapWrapper')[0]);
            };

            if(angular.isUndefined(attrs.ready)) {
                scope.render();

            } else {

                scope.ready = function () {
                    scope.render();
                };
            }

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
                        scope.object = new OpenLayers.Layer.WMS(params.title, params.url, params.params, params.options);

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