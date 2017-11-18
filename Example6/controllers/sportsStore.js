//add the module
angular.module("sportsStore")
    .constant("dataUrl", "http://localhost:2403/products/")
    .constant("orderUrl", "http://localhost:2403/orders/")
    .controller("sportStoreCtrl", function ($scope, $http, $location, dataUrl, orderUrl, cart)
    {
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

        $scope.sendOrder = function (shippingDetails)
        {
            var order = angular.copy(shippingDetails);
            order.products = cart.getProducts();
            $http.post(orderUrl, order)
                .then(function (data) {
                    $scope.data.orderId = data.id;
                    cart.getProducts().length = 0;
                })
                .catch(function (error) {
                    $scope.data.orderError = error;
                })
                .finally(function () {
                    $location.path("/complete");
                });
        }
    });