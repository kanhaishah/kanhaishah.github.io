var app = angular.module('almabaseApp', ['ngRoute', 'ngDraggable', 'ui.bootstrap', 'ui.sortable']);

app.config(function($routeProvider) {
    $routeProvider
       .when('/', {
            templateUrl : 'partials/profile.html',
            controller  : 'profileController'
        })
        .when('/profile', {
            templateUrl : 'partials/profile.html',
            controller  : 'profileController'
        });
});
