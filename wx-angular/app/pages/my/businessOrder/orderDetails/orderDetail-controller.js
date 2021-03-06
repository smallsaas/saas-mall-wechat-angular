angular.module('businessOrderDetails.controller', ['businessOrderDetails.service',
    "express.service", 'order.common', 'my.order.service'])

    .controller('BusinessOrderDetailsController', ['$scope', '$state','$rootScope', '$stateParams', 'BusinessOrderDetailsFty', 'ExpressInfo',
        'OrderCommon','OrderFty', '$ocLazyLoad','BalanceSession',
        function ($scope, $state,$rootScope, $stateParams, BusinessOrderDetailsFty, ExpressInfo, OrderCommon,OrderFty, $ocLazyLoad,BalanceSession) {

            var loaded = false;
            orderDetails();
            function orderDetails() {

                var orderNumber = $stateParams.orderNumber;

                BusinessOrderDetailsFty.orderDetailsService(orderNumber)
                    .then(function (json) {
                        //console.log(angular.toJson(json));
                        if (json.status_code == 0) {
                            $scope.detailsInfo = json.data;
                            var count = 0;
                            var t_price = 0;
                            angular.forEach($scope.detailsInfo.order_items, function (v, k) {
                                count += v.quantity;
                                //t_price += (v.final_price * v.quantity);
                                t_price += v.final_price;
                            });
                            $scope.productCount = count;
                            //$scope.total_price = t_price + $scope.detailsInfo.freight;

                            //console.log("t_price: " + t_price);
                            //console.log("freight: " + $scope.detailsInfo.freight);

                            $scope.order_address = "";
                            if ($scope.detailsInfo.province != null) {
                                $scope.order_address += $scope.detailsInfo.province;
                            }
                            if ($scope.detailsInfo.city != null) {
                                $scope.order_address += $scope.detailsInfo.city;
                            }
                            if ($scope.detailsInfo.district != null) {
                                $scope.order_address += $scope.detailsInfo.district;
                            }
                            if ($scope.detailsInfo.street != null) {
                                $scope.order_address += $scope.detailsInfo.street;
                            }
                            if ($scope.detailsInfo.street_number != null) {
                                $scope.order_address += $scope.detailsInfo.street_number;
                            }
                            if ($scope.detailsInfo.detail != null) {
                                $scope.order_address += $scope.detailsInfo.detail;
                            }
                            //?????????
                            //countDown($scope.detailsInfo.created_date);
                            //????????????
                            express_info($scope.detailsInfo.order_number);

                        } else {
                            $.toast("????????????????????????", "cancel")
                        }
                    }, function (error) {
                        $.toast("????????????????????????", "cancel")
                    }).finally(function(){
                        loaded = true;
                    })
            }

            //??????????????????
            /*function countDown(o_time){
             var begintime_ms = Date.parse(new Date(o_time.replace(/-/g, "/")));
             begintime_ms += 604800000;
             var endtime_ms = Date.parse(new Date());
             var overtime = begintime_ms - endtime_ms;

             var days = Math.floor(overtime/(24*3600*1000));

             var leave1 = overtime%(24*3600*1000);    //?????????????????????????????????
             var hours = Math.floor(leave1/(3600*1000));
             //?????????????????????
             //var leave2 = leave1%(3600*1000);        //????????????????????????????????????
             //var minutes = Math.floor(leave2/(60*1000));
             //??????????????????
             //var leave3 = leave2%(60*1000);      //????????????????????????????????????
             //var seconds = Math.round(leave3/1000);
             //alert(" ?????? "+days+"??? "+hours+"?????? "+minutes+" ??????"+seconds+" ???")

             $scope.over_time = overtime;
             $scope.c_d_day = days;
             $scope.c_d_hour = hours;
             }

             //????????????????????????
             $scope.auto_confirm_time = function(status){
             if(status == 'PAID_CONFIRM_PENDING' || status == 'DELIVERED_CONFIRM_PENDING' || status == 'DELIVERING'){
             return true;
             }
             return false;
             };*/

            //????????????
            $scope.order_status = function (orderStatus) {
                return OrderCommon.OrderStatus(orderStatus);
            };

            //????????????????????????--????????????
            $scope.cash_and_point_top = function(price, point, pay_type){
                if(pay_type == 'POINT'){
                    return '???????????????' + ((price * point).toFixed(0)) + '??????';
                }else if(pay_type == 'WECHAT'){
                }
                return '???????????????' + '???' + price.toFixed(2);
            };

            //????????????????????????
            $scope.cash_and_point_order_detail = function(price, point, pay_type){
                if(pay_type == 'POINT'){
                    return ((price * point).toFixed(0)) + '??????';
                }else if(pay_type == 'WECHAT'){
                }
                return '???' + price.toFixed(2);
            };

            //????????????
            function express_info(order_number) {

                ExpressInfo.ExpressService(order_number)
                    .then(function (json) {
                        //alert(angular.toJson(json));
                        $scope.j_status_code = json.status_code;
                        if (json.status_code == 0) {
                            $scope.ex_info = json.data.data;
                            if ($scope.ex_info.length > 0) {
                                $scope.ex_context = $scope.ex_info[0].context;
                                $scope.ex_time = $scope.ex_info[0].time;
                            }
                        }
                    }, function (error) {
                        console.log("error" + error);
                    })
            }

            //??????????????????
            $scope.goToSalesReturn = function (o_number, total_price, s_r_status) {

                $ocLazyLoad.load('Jquery').then(function(){
                    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        /*function start*/
                        if (s_r_status == 3) {
                            $.confirm('', '?????????????????????', function () {
                                $state.go('salesReturn', {
                                    orderNumber: o_number,
                                    totalPrice: total_price,
                                    SalesReturnStatus: s_r_status
                                });
                            }, function () {
                                //????????????
                            });
                        } else if (s_r_status == 1) {
                            $.confirm('', '??????????????????', function () {
                                $state.go('salesReturn', {
                                    orderNumber: o_number,
                                    totalPrice: total_price,
                                    SalesReturnStatus: s_r_status
                                });
                            }, function () {
                                //????????????
                            });
                        }
                        /*function end*/

                    })
                });
                /*lazy load end*/

            }

            $scope.deliverReminder = function (order_number) {

                OrderFty.deliverReminderService(order_number)
                    .then(function (json) {

                        $ocLazyLoad.load('Jquery').then(function () {
                            $ocLazyLoad.load('JqueryWeUI').then(function () {

                                if (json.status_code == 0) {
                                    $.toast('?????????????????????');
                                    //$state.go('orderDetails', {}, {reload: true});
                                } else {
                                    $.toast('????????????', 'cancel');
                                }
                            })
                        })


                    }, function (error) {
                        console.log(error);
                    })
            };

            //??????????????????
            $scope.goToExpress = function (item) {
                var p_img = item.order_items[0].cover;
                var count = 0;
                angular.forEach(item.order_items, function (v, k) {
                    count += v.quantity;
                });

                $state.go('express', {
                    orderNumber: item.order_number,
                    productImg: p_img,
                    productCount: count,
                    expressNumber:item.express_number,
                    expressCompany:item.express_company
                });
            };

            //????????????
            $scope.weixin_pay = function (order) {


                if(order.payment_type == "POINT"){
                    if(BalanceSession.balance >= order.totalPrice){
                        window.location.href = '/app/payment/ppay/' + order.order_number;//??????
                    }else{
                        $.alert('??????????????????','??????');
                    }
                }else if(order.payment_type == "WECHAT"){
                    window.location.href = '/app/payment/wpay/' + order.order_number; //??????
                }else{
                    // default to wechat
                    $.alert('???????????????????????????','??????');
                    console.log("???????????????" + angular.toJson(order));
                }
            };


            //????????????
            $scope.close_order_action = function (order_number) {

                if(!loaded){
                    $.toast('?????????', 'cancel');
                    return;
                }

                $ocLazyLoad.load('Jquery').then(function () {
                    $ocLazyLoad.load('JqueryWeUI').then(function () {

                        /*function start*/
                        $.confirm('', '????????????????????????', function () {
                            //var order_status = "CLOSED_CONFIRMED";
                            BusinessOrderDetailsFty.closeOrderService(order_number)
                                .then(function (json) {
                                    //console.log(angular.toJson(json));
                                    if (json.status_code == 0) {
                                        $.toast('????????????');
                                        $state.go('order.finish', {}, {reload: true});
                                    } else {
                                        $.toast('????????????', 'cancel');
                                    }
                                }, function (error) {
                                    console.log(error);
                                })
                        })
                        /*function end*/
                    })
                });
                /*end lazy*/
            };

            //?????????????????????
            $scope.goToDetails = function(productId){
                $state.go('details',{productId:productId});
            }

        }]);