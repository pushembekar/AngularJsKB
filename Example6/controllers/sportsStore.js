//add the module
angular.module("sportsStore")
    .constant("dataUrl", "http://localhost:2403/products/")
    .controller("sportStoreCtrl", function ($scope, $http, dataUrl) {
        $scope.data = {};
        // the success function
        function successHandler(response) {
            $scope.data.products = response.data;
        }
        // the error function
        function errorHandler(response) {
            $scope.data.error = response.data;
        }

        $http.get(dataUrl)
            .then(successHandler, errorHandler);
    });