'use strict';

'use strict';

app.directive('sglkAside',function () {

    return {
        templateUrl : 'views/sglk-aside.html',
        transclude  : true,
        restrict    : 'A',
        replace     : true,
        scope       : {
            ngModel : '='
        },
        controller  : function ($scope) {

            $scope.panes = [];

            $scope.ngModel = {
                all    : $scope.panes,
                active : ''
            };

            // this.functionName expose function to be accessible in tab directive
            // (requirer with require: '^sglkTabs' & injected into link with sglkTabsCtrl)
            this.addPane = function (pane) {

                $scope.panes.push(pane);

            };

            // show / hide / toggle pane
            this.togglePane = function (pane) {

                // if is active then juste hide
                if(pane.active) {

                    pane.active = false;
                    $scope.ngModel.active = '';

                } else {
                    // if isn't active then hide all and show pane

                    angular.forEach($scope.panes, function (pane) {
                        pane.active = false;
                    });

                    pane.active = true;
                    $scope.ngModel.active = pane.id;
                }

            };

        }
    };

}).directive('sglkAsideItem', function () {

        return {
            require     : '^sglkAside',
            templateUrl : 'views/sglk-aside-item.html',
            transclude  : true,
            restrict    : 'A',
            replace     : true,
            scope       : {
                picto : '@',
                id    : '@'
            },
            link        : function postLink(scope, element, attrs, sglkAsideCtrl) {
                // sglkAsideCtrl is arbitrary. only order matters

                // call exposed function from sglkAside directive's controller
                sglkAsideCtrl.addPane(scope);

                scope.toggle = function () {
                    sglkAsideCtrl.togglePane(scope);
                };

            }
        };
    });