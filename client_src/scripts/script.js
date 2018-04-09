angular.module('app', [])
    .directive('customDir', function () {
        return {
            restrict: 'E',
            templateUrl: 'template.html',
            controller: function ($http) {
                var c = this;
                c.test = 'Hello world!!';

                c.apiTest = null;

                $http({
                    method: 'GET',
                    url: '/test_get'
                }).then(function (response) {
                    c.apiTest = response;
                    console.log(response);
                });

            },
            controllerAs: 'c',
            link: function (scope, element, attrs, controllers) {

            }
        };
    })
