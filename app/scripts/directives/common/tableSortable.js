"use strict";
define([], function () {

    var tblSortable = function () {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link : function(scope,elem,attrs,ngModelCtrl){
               if (!ngModelCtrl) return;
               var tbody = elem.find('tbody');

               var sortElement = function (event, ui) {
                    var items = ngModelCtrl.$modelValue;
                    var temp;
                    var originPos =parseInt(ui.item.attr('index')) ;
                    var pos;
                    var elemHeight = ui.item.height();
                    var isMoveUp = ui.position.top < ui.originalPosition.top;
                    var moveDistance = Math.round(Math.abs(ui.position.top - ui.originalPosition.top) / elemHeight);

                    if (isMoveUp) {
                        temp = items[originPos];
                        pos = originPos - moveDistance;
                        if(pos < 0){
                            pos = 0;
                        }
                        scope.$apply(function(){
                            for(var k = originPos; k > pos;k--){
                                items[k] = items[k-1];
                            }
                            items[pos] = temp;
                        });
                    } else {
                        temp = items[originPos];
                        pos = originPos + moveDistance;
                        if(pos > items.length -1){
                            pos = items.length -1;
                        }
                        scope.$apply(function(){
                            for(var k = originPos; k < pos;k++){
                                items[k] = items[k+1];
                            }
                            items[pos] = temp;
                        });
                    }
               };
           
                tbody.sortable({
                    helper: function(e, ui) {
                        ui.children().each(function() {
                            $(this).width($(this).width());
                        });
                        return ui;
                    },
                    axis: "y",
                    update: sortElement
                }).disableSelection();


            }
        };
    };
    return tblSortable;
});

