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
    const HTTP_GET = 'GET';
    const HTTP_POST = 'POST';
    const HTTP_PUT = 'PUT';
    const HTTP_DELETE = 'DELETE';
    var $path;
    var $http_method;
    var $obj;
    var $function;
    function __construct($path='',$http_method='',$function='' ,$obj=null)
    {
        $this->path = $path;
        $this->http_method=$http_method;
        $this->function=$function;
        $this->obj=$obj;
    }
    function setObject($obj){
        $this->obj=$obj;
    }
}