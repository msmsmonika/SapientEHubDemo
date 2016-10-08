(function () {
    var app = angular.module("sapientApp", []);
    var codeInfoList = [];
    app.controller('SapientHubController', ['$http', '$scope', '$filter', function ($http, $scope, $filter) {
        $scope.ProductList = [];
        $scope.totalLikes = 0;
        $scope.isRatingClicked = false;
        $scope.searchString = '';
        $scope.tagAutoComplete = [];
        $scope.IsThisInSearch = function (prodInfo) {
            if (prodInfo.tags.join(' ').toUpperCase().indexOf($scope.searchString.toUpperCase()) > -1)
                return 1;
        }
        $scope.SortByThis = function (sortCategory) {
            switch (sortCategory) {
                case 'rating':
                    {
                        $scope.isRatingClicked = true;
                        $scope.checkToOrder = ['-rating'];
                        $('#sortLikes').removeClass('selSort');
                        $('#sortRating').addClass('selSort');
                    }
                    break;
                case 'likes':
                    {
                        $scope.isRatingClicked = false;
                        $scope.checkToOrder = ['-likes'];
                        $('#sortRating').removeClass('selSort');
                        $('#sortLikes').addClass('selSort');
                    }
                    break;
            }
        }
        $scope.clearSearch = function () {
            $scope.searchString = '';
            $('#searchInput').val('');
            $('#searchBar').slideUp();
        }
        $scope.checkToOrder = ($scope.isRatingClicked == true) ? ['-rating'] : ['-likes']
        $http({
            method: 'GET',
            url: 'https://hackerearth.0x10.info/api/nitro_deals?type=json&query=list_deals'
        }).then(function successCallback(response) {
            var modifiedData = [];
            //to generate data for number of likes as it was not available in rest api result
            $.each(response.data.deals, function (i, prod) {
                prod.likes = randomGenerate();
                $scope.totalLikes = $scope.totalLikes + parseInt(prod.likes);
                if (prod.rating > 5) {
                    prod.rating = 5;
                }
                $.each(prod.tags, function (j, tag) {
                    $('#tagsPopulateList').append('<option value="' + $.trim(tag) + '" />');
                })
                modifiedData.push(prod);
            });
            $scope.ProductList = modifiedData;
        }, function errorCall(response) {});
    }]);
    app.directive('starRating', function () {
        return {
            restrict: 'A',
            template: '<ul class="rating">' +
                '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                '\u2605' +
                '</li>' +
                '</ul>',
            scope: {
                ratingValue: '=',
                max: '='
            },
            link: function (scope, elem, attrs) {
                scope.stars = [];
                for (var i = 0; i < 5; i++) {
                    scope.stars.push({
                        filled: i < scope.ratingValue
                    });
                }
            }
        }
    });

    function randomGenerate() {
        return Math.floor((Math.random() * 1000) + 1);
    }
})();