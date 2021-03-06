angular.module('homePage.service', [])
    .factory('HomePageFty', ['$http', '$q','GlobalVariable',
        function($http,$q,GlobalVariable) {
            return{
                recommendProductService: function (pageNumber, pageSize) {
                    var deferred = $q.defer();
                    //var url = GlobalVariable.SERVER_PATH + "/product?pageNumber=" + pageNumber + "&pageSize=" + pageSize;
                    var url = GlobalVariable.SERVER_PATH + "/product_category?promoted=true";
                    $http.get(url)
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                getAdService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/ad/home";
                    $http.get(url)
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                getAdBanner: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/ad/banner";
                    $http.get(url)
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                getFollowusUrl: function() {
                    return GlobalVariable.FOLLOW_US_URL;
                },

                getMallName: function() {
                    return GlobalVariable.MALL_NAME;
                },

                // ?????????????????????????????????????????
                getBalanceService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/owner_balance";
                    $http.get(url,{
                        headers:{
                            'Authorization': GlobalVariable.ACCESS_TOKEN
                        }
                    })
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                // ?????????????????????????????????????????
                getSystemAnnouncementService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/system_announcement";
                    $http.get(url,{
                        headers:{
                            'Authorization': GlobalVariable.ACCESS_TOKEN
                        }
                    })
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                // ?????????????????????????????????????????????????????????????
                getCouponNotifyService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/coupon_notify";
                    $http.get(url,{
                        headers:{
                            'Authorization': GlobalVariable.ACCESS_TOKEN
                        }
                    })
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                // ????????????????????????
                getHomeFightGroupsService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/piece_group_purchase?pageNumber=1&pageSize=10";
                    $http.get(url,{
                        headers: {
                            'Authorization': GlobalVariable.ACCESS_TOKEN
                        }
                    })
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                },

                // ????????????????????????????
                homePageGetUserInfoService: function () {
                    var deferred = $q.defer();
                    var url = GlobalVariable.SERVER_PATH + "/profile";
                    $http.get(url,{
                        headers:{
                            'Authorization': GlobalVariable.ACCESS_TOKEN
                        }
                    })
                        .success(function (data) {
                            return deferred.resolve(data);
                        }).error(function (data) {
                            return deferred.reject(data);
                        });
                    return deferred.promise;
                }
            }
    }])
;