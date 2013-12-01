/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 12/1/13
 * Time: 5:59 AM
 * To change this template use File | Settings | File Templates.
 */


var config = eshopApp.config || (eshopApp.config = {});
(function (config) {
    var general = {
        id: "general",
        url: "/admin/general",
        text: "General Infomation",
        childs: [
            {
                url: "/admin/general/home",
                text: "Home"
            },
            {
                url: "/admin/general/basic",
                text: "Basic Information"
            }
        ]
    };
    var product = {
        id: "product",
        url: "/admin/product",
        text: "Product",
        childs: [
            {
                url: "/admin/product/search",
                text: "Search Product"
            },
            {
                url: "/admin/product/edit",
                text: "Edit Product"
            }
        ]
    };
    var navigation_bar = [
        general,
        product
    ];

    function RenderNavBarElement(node,level){
        var li = "<li id='navi-contents-index'></li>",
            a =  ("<a href='{0}'><span>{1}</span></a>").format([node.url, node.text]),
            result = $("<ul></ul>");
        if(node.hasOwnProperty("childs")){
            li = ("<li class='on-level{0}'></li>").format([level.toString()]);
            var ul = "<ul class='level{0}'></ul>".format([level.toString()]);;
            result.append(li).find("li").append(a).append(ul);
            var current_ul = result.find("ul");
            $(node.childs).each(function(){
                current_ul.append(RenderNavBarElement($(this)[0],level +1));
            });
        }
        else{
            result.append(li).find("li").append(a);
        }
        return result.html();
    }

    function RenderConfigurationToNavBar( config ){
        var navBarBuilElements =  $("<ul id='navi' class='clearfix'></ul>");
        $(config).each(function(){
            var element = $(this)[0],
                li = ("<li id='navi-{0}'></li>").format([element.id]),
                a =  ("<a href='{0}'><span class='level1'>{1}</span></a>").format([element.url, element.text]);
                elementLi = navBarBuilElements.append(li).find("li:last");

            elementLi.append(a);

            if(element.hasOwnProperty("childs")){
                var ul = "<ul class='level1'></ul>";
                elementLi.append(ul);
                var elementUl = elementLi.find("ul");
                $(element.childs).each(function(){
                    var childHtml = RenderNavBarElement($(this)[0],1);
                    elementUl.append(childHtml);
                });
            }
        });
        return "<ul id='navi' class='clearfix'>" + navBarBuilElements.html() + "</ul>";
    }

    function BuildNavTitleArray(config,parent,result){
        $(config).each(function(){
            var element = $(this)[0];
            result[element.url] = element.text;

            if(!!parent)
                result[element.url] = parent.text +" > "+ element.text;

            if(element.hasOwnProperty("childs")){
                $(element.childs).each(function(){
                    BuildNavTitleArray($(this)[0],element,result);
                });
            }
        });
    }


    var nav_title = {};
    BuildNavTitleArray(navigation_bar,null,nav_title);
    config.nav_title = nav_title;
    config.admin_nav_bar = RenderConfigurationToNavBar(navigation_bar);

})(config);
