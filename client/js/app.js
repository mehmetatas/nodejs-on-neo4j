var app = angular.module("app", []);
app.controller("testCtrl", ["$scope", "$http", function ($scope, $http) {
    $scope.insertUser = function () {
        $http.post("/api/user", {
            id: 1,
            name: "mehmet"
        }).then(function (resp) {
            alert("ok!");
        }, function (resp) {
            alert(resp.data.message);
        });
    };

    $scope.selectUser = function () {
        $http.get("/api/user/1").then(function (resp) {
            alert(resp.data.name);
        }, function (resp) {
            alert(resp.data.message);
        });
    };

    $scope.updateUser = function () {
        $http.put("/api/user/1", {
            name: "ali"
        }).then(function (resp) {
            alert("ok!");
        }, function (resp) {
            alert(resp.data.message);
        });
    };

    $scope.deleteUser = function () {
        $http.delete("/api/user/1").then(function (resp) {
            alert("ok!");
        }, function (resp) {
            alert(resp.data.message);
        });
    };
}]);