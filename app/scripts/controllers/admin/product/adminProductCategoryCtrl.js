

"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;
    
    adminModule.lazy.controller('adminProductCategoryCtrl', function ($scope,adminProductService) {

        $scope.categories =[];
        adminProductService.getCategories().then(function(data){
            $scope.categories = data.categories;
        });

        $scope.treeOptions = {
            dropped: function(event){
                debugger;
                console.log(event);
            }
        };

        $scope.add = function (scope) {
            scope.expand();
            $(".tree-add-region").hide();
            var addNewRiv = scope.$parent.$element.find(".tree-add-region").last();
            var input = addNewRiv.find('input');
            addNewRiv.show();
            input.focus();
            input.removeClass('has-error');
            input.val(null);
        };
        $scope.cancel = function (scope) {
            var input = scope.$parent.$element.find(".tree-add-region").last();
            input.hide();
            input.val('');
        };
        $scope.deleteCategory = function (scope) {
            scope.$parentNodesScope.removeNode(scope);
            adminProductService.deleteCategory(scope.$modelValue);
        }
        $scope.updateCategory = function (scope) {
            var input = scope.$element.find('input').first();
            var span = scope.$parent.$element.find('.tree-node-title').first();
            span.hide();
            input.css('display', 'inline');
            var originVal = input.val();
            $(".tree-add-region").hide();
            input.focus();

            input.focusout(function() {
                if(!eshopApp.helpers.isNotEmpty(input.val())){
                    input.addClass('has-error');
                }else if(originVal != input.val()){
                    input.removeClass('has-error');
                    input.hide();
                    span.show();
                    adminProductService.updateCategory(scope.$modelValue);
                }else{
                    input.removeClass('has-error');
                    input.hide();
                    span.show();
                }
            });
        };
        $scope.insertCategory = function (scope) {

            var nodeData = scope.$parent.$modelValue;
            var display_order = nodeData.childs.length;
            var input = scope.$element.find('input').last();
            var inputVal = input.val();
            input.focus();

            if(eshopApp.helpers.isNotEmpty(inputVal)){
                input.removeClass('has-error');
                $(".tree-add-region").hide();
                var category = {
                    "category_name": inputVal,
                    "parent_id": nodeData.category_id,
                    "level": parseInt(nodeData.level) + 1,
                    "display_order": display_order,
                    "childs": []
                };
                adminProductService.insertCategory(category).then(function(data){
                    category.category_id = data;
                    nodeData.childs.push(category);
                });
                $('.top-right').notify({
                    message: { text: 'Add new success!' }
                }).show(); // for the ones that aren't closable and don't fade out there is a .hide() function.
            }else{
                input.addClass('has-error');
            }
        };
	
	});
});





