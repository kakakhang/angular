"use strict";
define([], function () {

    var tblSortable = function () {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link : function(scope,elem,attrs,ngModelCtrl){
                debugger;
               if (!ngModelCtrl) return;

                // Return a helper with preserved width of cells
                var fixHelper = function(e, ui) {
                    ui.children().each(function() {
                        $(this).width($(this).width());
                    });
                    return ui;
                };

                elem.find('.moveable').sortable({
                    helper: fixHelper,
                    change: function( event, ui ) {
                        console.log('khang');
                    }
                }).disableSelection();


            }
        };
    };
    return tblSortable;
});

