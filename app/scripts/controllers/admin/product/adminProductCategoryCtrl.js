

"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;
    
    adminModule.lazy.controller('adminProductCategoryCtrl', function ($scope) {

        $scope.list = [{
            "id": 1,
            "title": "1. dragon-breath",
            "parent": -1,
            "level": 0,
            "items": []
        }, {
            "id": 2,
            "title": "2. moire-vision",

            "items": [{
                "id": 21,
                "title": "2.1. tofu-animation",
                "items": [{
                    "id": 211,
                    "title": "2.1.1. spooky-giraffe",
                    "items": []
                }, {
                    "id": 212,
                    "title": "2.1.2. bubble-burst",
                    "items": []
                }],
            }, {
                "id": 22,
                "title": "2.2. barehand-atomsplitting",
                "items": []
            }],
        }, {
            "id": 3,
            "title": "3. unicorn-zapper",
            "parent": -1,
            "level": 0,
            "items": []
        }, {
            "id": 4,
            "title": "4. romantic-transclusion",
            "parent": -1,
            "level": 0,
            "items": []
        }];
        
        $scope.showAddNew = function (scope) {
            scope.$parent.expandAll();
            $(".form-inline").hide();
            var input = scope.$parent.$element.find(".form-inline").last();
            input.show();
            input.focus();
        };
        $scope.hideAddNew = function (scope) {
            var input = scope.$parent.$element.find(".form-inline").last();
            input.hide();
            input.val('');
        };
      
        $scope.editItem = function (scope) {
            var input = scope.$element.find('input').first();
            var span = scope.$parent.$element.find('.tree-node-title').first();
            span.hide();
            input.css('display', 'inline');
            $(".form-inline").hide();
            input.focus();
            input.focusout(function() {
                $(this).hide();
                span.show();
            });
        };
        $scope.newSubItem = function (scope) {
            var nodeData = scope.$parent.$modelValue;
            var input = scope.$element.find('input').last();
            var inputVal = input.val();
            input.focus();
            nodeData.items.push({
                id: nodeData.id * 10 + nodeData.items.length,
                title: inputVal,
                items: []
            });
           
            $(".tree-add-region").hide();
            $('.top-right').notify({
                message: { text: 'Add new success!' }
            }).show(); // for the ones that aren't closable and don't fade out there is a .hide() function.
        };
	
	});
});





