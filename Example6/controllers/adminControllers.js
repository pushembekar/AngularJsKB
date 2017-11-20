// JavaScript source code
angular.module("sportsStoreAdmin")
    .constant("authUrl", "http://localhost:2403/users/login")
    .constant("ordersUrl", "http://localhost:2403/orders")
    .controller("authCtrl", function ($scope, $http, $location, authUrl)
    {
        $scope.authenticate = function (user, pass)
        {
            $http.post(authUrl, { username: user, password: pass }, {
                withCredentials: true
            }).then(function (data) {
                $location.path("/main");
            }).catch(function (error) {
                $scope.authenticationError = error;
            });
        }
    })
    .controller("mainCtrl", function ($scope) {
        $scope.screens = ["Products", "Orders"];
        $scope.current = $scope.screens[0];

        $scope.setScreen = function (index) {
            $scope.current = $scope.screens[index];
        }

        $scope.getScreen = function () {
            return $scope.current == "Products" ? "views/adminProducts.html" : "views/adminOrders.html";
        }
    })
    .controller("ordersCtrl", function ($scope, $http, ordersUrl) {
        $http.get(ordersUrl, { withCredentials: true })
            .then(function (response) {
                $scope.orders = response.data;
            })
            .catch(function (response) {
                $scope.error = response.error;
            });
        $scope.selectedOrder;

        $scope.selectOrder = function (order) {
            $scope.selectedOrder = order;
        };

        $scope.calcTotal = function (order) {
            var total = 0;
            for (var i = 0; i < order.products.length; i++)
            {
                total += order.products[i].price * order.products[i].count;
            }
            return total;
        }
    })
    ;