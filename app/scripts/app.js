//MODULE

var app = angular.module('timetravelerApp', ['ngRoute', 'wu.masonry', 'infinite-scroll']);
//var appMasonry = angular.module('masonryApp', ['ngMasonry']);
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 100);

//ROUTE
app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    .when('/main',{
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })
    .when('/about',{
        templateUrl: 'pages/about.html',
        controller: 'aboutController'
    })
    .when('/portfolio',{
        templateUrl: 'pages/portfolio.html',
        controller: 'portfolioController'
    })
    .when('/contact',{
        templateUrl: 'pages/contact.html',
        controller: 'contactController'
    })
});
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
//SERVICE

app.factory("imgService", function($http, $q){
	
	var imgFactory = {},
	SERVICE_URL = 'images.json',
	images = null;

	imgFactory.getImages = function(){
		var deferred = $q.defer();
		if(!images) {
			$http.get(SERVICE_URL, {cache: true}).success(function(data){
				images = data.images;
				deferred.resolve(images);
			});
		} else {
			deferred.resolve(images);
		} return deferred.promise;
	};

	return imgFactory;
});

//CONTROLLER

app.controller('mainController', function($scope){
    
});

app.controller('aboutController', function($scope){
    
});

app.controller('portfolioController', function($scope){
    
});

app.controller('contactController', function($scope){
    
});

app.controller('imgController', function($scope, imgService) {
		$scope.IMAGES_PER_PAGE = 10;
		$scope.visibleImages = [];
		$scope.images = [];
		$scope.imgLoaded = false;

		$scope.loadPage = function(){
			if($scope.imgLoaded && $scope.images.length){
				$scope.visibleImages = $scope.visibleImages.concat($scope.images.splice(-$scope.images.length-1, $scope.IMAGES_PER_PAGE))
			}
		};

		imgService.getImages().then(function(data){
			for(var image in data){
				$scope.images.push(data[image]);
			}
			$scope.imgLoaded = true;
			$scope.loadPage();
		}, function(){
			console.log('Something went wrong'); 
			});
		});

		/*$scope.imgLoaded = function(index) {
     	console.log('Image loaded notification for artist '+index);
     	loadedCount++;
     	if (loadedCount === $scope.bricks.length) {
    	   //All images have loaded. Trigger reload
    	   console.log('Triggering reload');
     	  $rootScope.$broadcast('masonry.reload');
     	}
   };
 });*/

