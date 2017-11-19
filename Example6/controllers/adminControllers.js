// JavaScript source code
angular.module("sportsStoreAdmin")
    .constant("authUrl", "http://localhost:2403/users/login")
    .controller("authCtrl", function ($scope, $http, $location, authUrl)
    {
        $scope.authenticate = function (user, pass)
        {
            http.post(authUrl, { username: user, password: pass }, {
                withCredentials: true
            }).then(function (data) {
                $location.path("/main");
            }).catch(function (error) {
                $scope.authenticationError = error;
            });
        }
    }
);