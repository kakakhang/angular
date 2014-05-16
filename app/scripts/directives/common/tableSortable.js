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
                    debugger;
                    var items = ngModelCtrl.$modelValue;
                    var temp;
                    var originPos = 2;
                    var pos;
                    var elemHeight = ui.item.height();
                    var isMoveUp = ui.position.top < ui.originalPosition.top;
                    var moveDistance = Math.round(Math.abs(ui.position.top - ui.originalPosition.top) / elemHeight);

                    if (isMoveUp) {
                        pos = originPos - moveDistance;
                    } else {
                        pos = originPos + moveDistance;
                    }
                    temp = items[originPos];
                    items[originPos] = items[pos];
                    items[pos] = temp;
                   debugger;
                   return this;
               };
           
                tbody.sortable({
                    helper: function(e, ui) {
                        ui.children().each(function() {
                            $(this).width($(this).width());
                        });
                        return ui;
                    },
                    axis: "y",
                    stop: sortElement
                }).disableSelection();


            }
        };
    };
    return tblSortable;
});

