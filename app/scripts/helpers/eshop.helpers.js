"use strict";


//=========================EXTENSION REGION ==============================

/*
* String format helper
* Ex: var a = 'this is a {0}';
*         a.format(['girl'])
*   Result :  this is a girl
* */
String.prototype.format = function (args) {
    var str = this;
    return str.replace(String.prototype.format.regex, function(item) {
        var intVal = parseInt(item.substring(1, item.length - 1));
        var replace;
        if (intVal >= 0) {
            replace = args[intVal];
        } else if (intVal === -1) {
            replace = "{";
        } else if (intVal === -2) {
            replace = "}";
        } else {
            replace = "";
        }
        return replace;
    });
};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");


(function(parent, $, undefined) {
    var helpers = parent.helpers = parent.helpers || {};
	console.log('helpers load');
	/**  Render node HMTL. Find all childs node to render recursively
	 *   @param node  element render 
	 *	 @param level keep track node level 
	 */
	helpers.renderNavBarElement = function(node,level){

        var display = typeof node.display !== 'undefined' ? 'display:' + node.display : '';
		var li = ("<li id='navi-contents-index' style='{0}'></li>").format([display]),
		a =  ("<a href='{0}'><span>{1}</span></a>").format([node.url, node.text]),
		result = $("<ul></ul>");
		if(node.hasOwnProperty("childs")){
			li = ("<li class='on_level{0}'></li>").format([level.toString()]);
			var ul = "<ul class='level{0}'></ul>".format([level.toString()]);;
			result.append(li).find("li").append(a).append(ul);
			var current_ul = result.find("ul");
			$(node.childs).each(function(){
				current_ul.append(eshopApp.helpers.renderNavBarElement($(this)[0],level +1));
			});
		}
		else{
			result.append(li).find("li").append(a);
		}
		return result.html();
	},
	
	/** Render navigation bar configuration info to HTML
	 * @param config Config info
	 */
	helpers.renderConfigurationToNavBar = function( config ){
		var navBarBuilElements =  $("<ul id='navi' class='clearfix'></ul>");
		$(config).each(function(){
			var element = $(this)[0],
				li = ("<li id='navi-{0}'></li>").format([element.id]),
				a =  ("<a href='{0}'><span class='level1'>{1}</span></a>").format([element.url, element.text]),
				elementLi = navBarBuilElements.append(li).find("li:last");

			elementLi.append(a);

			if(element.hasOwnProperty("childs")){
				var ul = "<ul class='level1'></ul>";
				elementLi.append(ul);
				var elementUl = elementLi.find("ul");
				$(element.childs).each(function(){
					var childHtml = eshopApp.helpers.renderNavBarElement($(this)[0],2);
					elementUl.append(childHtml);
				});
			}
		});
		
		var scriptRegisterHoverEvent = "<script type='text/javascript'>$('#navi li').hover( function(){ $(this).addClass('sfhover');}, function(){$(this).removeClass('sfhover');});</script>";
		return "<ul id='navi' class='clearfix'>" + navBarBuilElements.html() + "</ul>" + scriptRegisterHoverEvent;
	},
	/** Build Navigation Title
	 *	
	 */
	helpers.buildNavTitleArray = function( config, parent, result ){
		$(config).each(function(){
			var element = $(this)[0];
			result[element.url] = element.text;

			if(!!parent)
				result[element.url] = parent.text +" > "+ element.text;

			if(element.hasOwnProperty("childs")){
				$(element.childs).each(function(){
					eshopApp.helpers.buildNavTitleArray($(this)[0],element,result);
				});
			}
		});
	},
    helpers.isNotUndefined = function(value){
        return (typeof value !== 'undefined');
    },
    helpers.isEmpty = function isEmpty(str) {
        return (!str || 0 === str.length);
    },
    helpers.isNotEmpty = function isEmpty(str) {
        return !eshopApp.helpers.isEmpty(str)
    },
    helpers.convertSelect2Option = function (scope,dataSource,idFieldName,textFieldName) {
        angular.forEach(dataSource, function(item) {
            scope.push( {id:item[idFieldName],text:item[textFieldName]} );
        });
    }


}(window.eshopApp = window.eshopApp || {}, jQuery));





(function ($) {
    var Notification = function (element, options) {
        // Element collection
        this.$element = $(element);
        this.$note = $('<div class="alert"></div>');
        this.options = $.extend(true, {}, $.fn.notify.defaults, options);

        // Setup from options
        if (this.options.transition)
            if (this.options.transition == 'fade')
                this.$note.addClass('in').addClass(this.options.transition);
            else this.$note.addClass(this.options.transition);
        else this.$note.addClass('fade').addClass('in');

        if (this.options.type)
            this.$note.addClass('alert-' + this.options.type);
        else this.$note.addClass('alert-success');

        if (!this.options.message && this.$element.data("message") !== '') // dom text
            this.$note.html(this.$element.data("message"));
        else
            if (typeof this.options.message === 'object')
                if (this.options.message.html)
                    this.$note.html(this.options.message.html);
                else if (this.options.message.text)
                    this.$note.text(this.options.message.text);
                else
                    this.$note.html(this.options.message);

        if (this.options.closable)
            var link = $('<a class="close pull-right" href="#">&times;</a>');
        $(link).on('click', $.proxy(onClose, this));
        this.$note.prepend(link);

        return this;
    };

    var onClose = function () {
        this.options.onClose();
        $(this.$note).remove();
        this.options.onClosed();
        return false;
    };

    Notification.prototype.show = function () {
        if (this.options.fadeOut.enabled)
            this.$note.delay(this.options.fadeOut.delay || 3000).fadeOut('slow', $.proxy(onClose, this));

        this.$element.append(this.$note);
        this.$note.alert();
    };

    Notification.prototype.hide = function () {
        if (this.options.fadeOut.enabled)
            this.$note.delay(this.options.fadeOut.delay || 3000).fadeOut('slow', $.proxy(onClose, this));
        else onClose.call(this);
    };

    $.fn.notify = function (options) {
        return new Notification(this, options);
    };

    $.fn.notify.defaults = {
        type: 'success',
        closable: true,
        transition: 'fade',
        fadeOut: {
            enabled: true,
            delay: 3000
        },
        message: null,
        onClose: function () {
        },
        onClosed: function () {
        }
    };
})(window.jQuery);