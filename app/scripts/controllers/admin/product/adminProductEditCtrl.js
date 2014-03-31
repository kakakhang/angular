"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductEditCtrl', function ($scope, $stateParams, $http,adminProductService) {

        //Show and hide image upload element
        var showImageAndDeleteLink = function(imageSelector,imgName,linkSelector){
            $(imageSelector).show();
            $(imageSelector).attr('src', eshopApp.config.imagePath + imgName);
            $(linkSelector).show();
        };
        var hideImageAndDeleteLink = function (imageSelector,linkSelector){
            $(imageSelector).hide();
            $(imageSelector).attr('src', '');
            $(linkSelector).hide();
        };
        var showUploadImage = function(inputSelector,btnSelector){
            $(inputSelector).show();
            $(btnSelector).show();
        };
        var hideUploadImage = function(inputSelector,btnSelector){
            $(inputSelector).hide();
            $(inputSelector).val('').clone(true);
            $(btnSelector).hide();
        };
        var initDisplayImage = function(imageName1,imageName2){

            if(imageName1.length > 0){
                showImageAndDeleteLink('#img_list_image',imageName1,'#list_image_delete');
                hideUploadImage('#f_list_image','#btn_list_image_upload');
            }else{
                hideImageAndDeleteLink('#img_list_image','#list_image_delete');
                showUploadImage('#f_list_image','#btn_list_image_upload');
            }

            if(imageName2.length > 0){
                showImageAndDeleteLink('#img_main_image',imageName2,'#main_image_delete');
                hideUploadImage('#f_main_image','#btn_main_image_upload');
            }else{
                hideImageAndDeleteLink('#img_main_image','#main_image_delete');
                showUploadImage('#f_main_image','#btn_main_image_upload');
            }
        };

        adminProductService.getCategoryAndStatus().then(function (data) {
            $scope.cats = data.cat;
            $scope.status = data.status;
        });
        //if exist product id
        if ($stateParams.productId) {
            adminProductService.getProduct($stateParams.productId)
                          .then(function (data) {
                              $scope.product = data;
                              $scope.product.imageName1 = data.list_image;
                              //initDisplayImage(data.list_image,data.main_image)
                          });
        }else{
           // initDisplayImage('','');
        }


       $scope.uploadImage = function(inputElement,imageSelector,linkDeleteSelector,btnUploadSelector){

            adminProductService.imageUpload($(inputElement)[0].files[0])
                .then(function(data){
                    showImageAndDeleteLink(imageSelector,data,linkDeleteSelector);
                    hideUploadImage(inputElement,btnUploadSelector);
                    $scope.product.list_image = data;
                });
        };


        $scope.deleteImage = function(imageSelector,linkDeleteSelector,inputElement,btnUploadSelector){

            adminProductService.deleteImage($scope.imageName).then(function(data){
                hideImageAndDeleteLink(imageSelector,linkDeleteSelector);
                showUploadImage(inputElement,btnUploadSelector);
            });

        };






    });
});


