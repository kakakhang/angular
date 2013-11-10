<?php
/**
 * Created by JetBrains PhpStorm.
 * User: khanghuynh
 * Date: 11/8/13
 * Time: 4:08 PM
 * To change this template use File | Settings | File Templates.
 */
namespace Service\APIProfile;

class APIInfo {
    var $path;
    var $http_method;
    var $obj;
    var $function;
    function __construct($path='',$http_method='',$obj=null,$function='' )
    {
        $this->path = $path;
        $this->http_method=$http_method;
        $this->obj=$obj;
        $this->function=$function;
    }
}