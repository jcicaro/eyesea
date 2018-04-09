angular.module('app', [])
    .directive('customDir', function () {
        return {
            restrict: 'E',
            template:'<div class="container"><h1>{{c.test}}</h1><input type="text" ng-model="c.test"><div>{{c.apiTest}}</div></div>',
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
