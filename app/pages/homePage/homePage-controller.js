angular.module('homePage.controller', ['homePage.service'])

    .controller('HomePageController', ['$scope', '$state', '$rootScope', 'HomePageFty',
        function ($scope, $state,$rootScope, HomePageFty) {

            document.title = "十美优品商城";

            $rootScope.tabsNumber = 1;

            /* setTimeout(function(){
             document.title = "首页";
             var iframe = document.createElement('iframe');
             iframe.style.visibility = 'hidden';
             iframe.style.width = '1px';
             iframe.style.height = '1px';
             iframe.onload = function(){
             setTimeout(function(){
             document.body.removeChild(iframe);
             },0)
             }
             },0);*/


            /*TitleReSet("首页");
             function TitleReSet(title) {
             // body...
             document.title = title;
             //如果是IOS端微信,无法直接修改title.需要下面这一段神代码...
             //没看懂为什么添加一个iframe,然后remove掉就能动态修改title
             var $body = $('body');
             var $iframe = $('<iframe src="img/home/home-title-img.png" style="display:none;"></iframe>');
             $iframe.on('load', function (argument) {
             //console.log("loading....");
             setTimeout(function () {
             //console.log("remove....");
             $iframe.off('load').remove();
             }, 0);
             }).appendTo($body);
             }*/

            $scope.currentId = 1;

            //获取广告
            getAdHome();
            getAdBanner();
            //获取推荐商品
            getRecommendProduct();

            function getRecommendProduct() {
                HomePageFty.recommendProductService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.rec_product = json.data;
                            //alert(angular.toJson(json.data));
                        }
                    }, function (error) {
                        $.toast('获取推荐商品失败', 'cancel');
                    })
            }

            function getAdHome() {
                HomePageFty.getAdService()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.ad_list = json.data;
                            //console.log(angular.toJson($scope.ad_list));
                        }
                    }, function (error) {
                        $.toast('获取广告信息失败', 'cancel');
                    })
            }

            function getAdBanner() {
                HomePageFty.getAdBanner()
                    .then(function (json) {
                        if (json.status_code == 0) {
                            $scope.ad_banner = json.data;
                            //console.log("ad?"+angular.toJson($scope.ad_banner ));
                            $scope.ad_banner_1 = $scope.ad_banner[0];
                            $scope.ad_banner_2 = $scope.ad_banner[1];
                            //console.log("ad-banner-1?"+angular.toJson($scope.ad_banner_1));
                        }
                    }, function (error) {
                        $.toast('获取广告列表失败', 'cancel');
                    })
            }

            /*//适应屏幕大小
            function ReImgSize() {
                for (var j = 0; j < document.images.length; j++) {
                    document.images[j].width = (document.images[j].width > 420) ? "420" : document.images[j].width;
                }
            }*/


            //搜索栏
            $scope.goToSearchPage = function(){
                $state.go('searchPage');
            }
        }]);