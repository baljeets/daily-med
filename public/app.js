// app.js

var app = angular.module('dm-app', ['ngRoute'])

.config(function ($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: 'views/homeView.html',
        controller: 'homeController'
    })

    $routeProvider.otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
});


app.service('dailyMedService', ['$http', function ($http) {
    var dailyMedService = {
        getDailyMeds: function () {
            return $http.get('/api/getmeds');
        }
    };
    return dailyMedService;
}]);

function mainController($scope) {
    // We will create an seo variable on the scope and decide which fields we want to populate 
    $scope.seo = {
        pageTitle: '', pageDescription: ''
    };
}

function homeController($scope, dailyMedService, $anchorScroll, $location, $window) {
    $scope.getAllMeds = function () {
        dailyMedService.getDailyMeds()
            .then(function (response) {
                $scope.medicines = response.data;                
            });
    };

    $scope.gotoAnchor = function (x) {       
        var newHash = '#d' + x;
        var p = $(newHash);
        var offset = p.offset();        
        $('html, body').animate({
            scrollTop: offset.top-30
        }, 500);       
    };
}

function aboutController($scope) {
    $scope.$parent.seo = {
        pageTitle: 'About',
        pageDescripton: 'We are a content heavy website so we need to be indexed.'
    };
}

function featuresController($scope) {
    $scope.$parent.seo = { pageTitle: 'Features', pageDescripton: 'Check out some of our awesome features!' };
}