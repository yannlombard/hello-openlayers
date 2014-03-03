'use strict';

var app = angular.module('carto', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.sortable'
]);
app.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'views/main.html',
            controller  : 'MainCtrl'
        })
        .otherwise({
            redirectTo : '/'
        });
});
