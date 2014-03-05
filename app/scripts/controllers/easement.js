'use strict';

app.controller('easementCtrl', function ($scope) {
    // $scope.map herited from parent scope

    var drawings = new OpenLayers.Layer.Vector();

    $scope.test = function() {

        $scope.map.addLayer(drawings);

        var draw = new OpenLayers.Control.DrawFeature(drawings, OpenLayers.Handler.Polygon);

        $scope.map.addControl(draw);
        draw.activate();

    };

    drawings.events.on({
        beforefeatureadded: function(event) {

            var polygonLayer = new OpenLayers.Layer.Vector("Polygon");
            var polygonFeature = new OpenLayers.Feature.Vector(event.feature.geometry);
            polygonLayer.addFeatures(polygonFeature);

            $scope.map.addLayer(polygonLayer);

            var wkt = new OpenLayers.Format.WKT();
            var currentWkt = wkt.write(polygonFeature);

            $scope.$apply(function() {
                $scope.geometryString = currentWkt;
            });

            return false;
        }
    });

});
