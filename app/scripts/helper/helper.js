var config = eshopApp.config || (eshopApp.config = {});
(function (config) {
    var general = {
        id: "general",
        url: "/admin/general",
        text: "General Infomation",
        childs: [
            {
                url: "/home",
                text: "Home"
            },
            {
                url: "/basic",
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
                url: "/search",
                text: "Search Product"
            },
            {
                url: "/edit",
                text: "Edit Product"
            }
        ]
    };
    var navigation_bar = [
        general,
        product
    ];
    config.navigation_bar = navigation_bar;
})(config);


// This is the function.
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



function RenderNavBarElement(node,level){
    var li = "<li></li>",
        a = ("<a href='{0}'<span>{1}</span></a>").format([node.url,node.text]),
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
        var element = $(this)[0];
        var li = ("<li id='navi-{0}'></li>").format([element.id]);
        var a =  ("<a href='{0}'><span class='level1'>{1}</span></a>").format([element.url, element.text]);
        var elementLi = navBarBuilElements.append(li).find("li:last");
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


