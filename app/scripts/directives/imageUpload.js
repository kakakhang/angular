"use strict";
define(['adminModule','jqueryLoadMask'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.directive('imageUpload', function (adminProductService) {


        var imagePath = eshopApp.config.imagePath;          //config path to image folfer

        var isNotEmpty = eshopApp.helpers.isNotEmpty;       //check if value is not empty

        //wrap div tag external to prevent parse template error. Template only allow inside single tag
        var template =  '<div>'+
                        '   <img ng-src="'+ imagePath +'{{imageSrc}}" style="width:{{imgWidth}};height:{{imgHeight}} "/> ' +
                        '   <a  href="javascript:;"  ng-click="deleteImage()">[Delete]</a>' +
                        '   </br>'+
                        '   <input type="file"  name="f_list_image2" size="40"/>' +
                        '   <a class="btn-normal" href="javascript:;" ng-click="uploadImage()">Upload</a>' +
                        '</div>';

        //show image and delete link after upload image success
        var showImageAndDeleteLink = function(imgElem,delElem){
            $(imgElem).show();
            $(delElem).show();
        };

        //hide image and link after delete image
        var hideImageAndDeleteLink = function (imgElem,delElem){
            $(imgElem).hide();
            $(delElem).hide();
        };

        //show upload image input
        var showUploadImage = function(inputElem,btnElem){
            $(inputElem).show();
            $(btnElem).show();
        };

        //hide upload image input
        var hideUploadImage = function(inputElem,btnElem){
            $(inputElem).hide();
            $(inputElem).val('').clone(true);
            $(btnElem).hide();
        };

        return {
            scope: {
                imageSrc: "=",  // 2 way binding,
                imgWidth: "@",
                imgHeight: "@"
            },                  //isolate scope
            restrict: 'AE',
            replace: true,      // specify that element in view will be replaced by directive template
            template : template,
            link : function(scope,elem,attrs){

                var file        =   $('input',elem)[0],     //file upload
                    btnDelete   =   $('a',elem)[0],         //link delete image
                    btnUpload   =   $('a',elem)[1],         //btn upload
                    img         =   $('img',elem)[0];       //image element


                //init display
                scope.$watch('imageSrc', function() {
                    if(isNotEmpty(scope.imageSrc)){
                        showImageAndDeleteLink( img, btnDelete );
                        hideUploadImage( file,btnUpload );
                    }
                    else{
                        hideImageAndDeleteLink( img,btnDelete );
                        showUploadImage( file,btnUpload );
                    }
                });

                //delete image
                scope.deleteImage = function(){
                    adminProductService.deleteImage( scope.imageSrc ).then(function(){
                        scope.imageSrc = '';
                    });
                }

                //upload image. Show loading mask while uploading
                scope.uploadImage = function(){
                    if(eshopApp.helpers.isNotUndefined( file.files[0])) {

                        $(elem).mask("Uploading...");

                        adminProductService.imageUpload( file.files[0] ).then(
                            function(data){
                                $(elem).unmask();
                                scope.imageSrc = data;
                            },
                            function(error){
                                console.log('upload error: '+ error);
                                $(elem).unmask();
                                scope.imageSrc = '';
                            }
                        );
                    }
                }
            }
    };
    });
});

