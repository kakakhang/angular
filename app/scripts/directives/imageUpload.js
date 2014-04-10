"use strict";
define(['adminModule','jqueryLoadMask'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.directive('imageUpload', function (adminProductService) {
        //config path to image folfer
        var imagePath = eshopApp.config.imagePath;
        //wrap div tag external to prevent parse template error. Template only allow inside single tag
        var template =  '<div>'+
                        '   <img ng-src="'+ imagePath +'{{imageSrc}}" style="width:{{imgWidth}};height:{{imgHeight}} "/> ' +
                        '   <a  href="javascript:;"  ng-click="deleteImage()">[Delete]</a>' +
                        '   </br>'+
                        '   <input type="file"  name="f_list_image2" size="40"/>' +
                        '   <a class="btn-normal" href="javascript:;" ng-click="uploadImage()">Upload</a>' +
                        '</div>';

        var showImageAndDeleteLink = function(imgElem,delElem){
            $(imgElem).show();
            $(delElem).show();
        };
        var hideImageAndDeleteLink = function (imgElem,delElem){
            $(imgElem).hide();
            $(delElem).hide();
        };
        var showUploadImage = function(inputElem,btnElem){
            $(inputElem).show();
            $(btnElem).show();
        };
        var hideUploadImage = function(inputElem,btnElem){
            $(inputElem).hide();
            $(inputElem).val('').clone(true);
            $(btnElem).hide();
        };

        return {
            scope: {
                imageSrc: "=", // 2 way binding,
                imgWidth: "@",
                imgHeight: "@"
            }, //isolate scope
            restrict: 'AE',
            replace: true, // specify that element in view will be replaced by directive template
            template : template,
            link : function(scope,elem,attrs){
            var file = $('input',elem)[0],
                btnDelete = $('a',elem)[0],
                btnUpload = $('a',elem)[1],
                img = $('img',elem)[0];



            scope.$watch('imageSrc', function() {
                if(typeof scope.imageSrc !== 'undefined' && scope.imageSrc.length > 1){
                    showImageAndDeleteLink(img, btnDelete);
                    hideUploadImage(file,btnUpload);
                }else{
                    hideImageAndDeleteLink(img,btnDelete);
                    showUploadImage(file,btnUpload);
                }
            });

            scope.deleteImage = function(){
                adminProductService.deleteImage(scope.imageSrc).then(function(){
                    scope.imageSrc = '';
                });
            }

            scope.uploadImage = function(){
                $(elem).mask("Uploading...");
                adminProductService.imageUpload(file.files[0])
                    .then(function(data){
                        $(elem).unmask();
                        scope.imageSrc = data;
                    });
            }


        }
    };
    });
});

