"use strict";
debugger;

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
	
	/**  Render node HMTL. Find all childs node to render recursively
	 *   @param node  element render 
	 *	 @param level keep track node level 
	 */
	helpers.renderNavBarElement = function(node,level){
		var li = "<li id='navi-contents-index'></li>",
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
	}

}(window.eshopApp = window.eshopApp || {}, jQuery));






