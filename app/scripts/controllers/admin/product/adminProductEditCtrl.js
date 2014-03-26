"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductEditCtrl', function ($scope, $stateParams, $http,adminProductService) {

        $('#img_list_image').hide();
        $('#list_image_delete').hide();
        
        adminProductService.getCategoryAndStatus().then(function (data) {
            $scope.cats = data.cat;
            $scope.status = data.status;
        });
        //if exist product id
        if ($stateParams.productId) {
            adminProductService.getProduct($stateParams.productId)
                          .then(function (data) {
                              $scope.product = data;
                          });
        }
        console.log('image path: '+ eshopApp.config.imagePath);
        $scope.uploadImage = function(){
            adminProductService.imageUpload($('#list_image')[0].files[0]).then(function(data){
                $('#img_list_image').show();
                $('#img_list_image').attr('src', eshopApp.config.imagePath + data);
                $('#list_image_delete').show();
                $('#list_image_input').val(data);
                $('#list_image').hide();
                $('#btn_list_image_upload').hide();

            });

        };
        $scope.deleteImage = function(){
            adminProductService.deleteImage($('#list_image_input').val()).then(function(data){
                $('#img_list_image').hide();
                $('#img_list_image').attr('src', eshopApp.config.imagePath + data);
                $('#list_image_delete').hide();
                $('#list_image').show();
                $('#btn_list_image_upload').show();

            });

        };


    });
});


