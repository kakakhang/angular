<?php
/**
 * Created by JetBrains PhpStorm.
 * User: khanghuynh
 * Date: 11/8/13
 * Time: 4:59 PM
 * To change this template use File | Settings | File Templates.
 */

class BaseProfile {

    var $obj;
    var $arrAPI;
    function __construct(){
       $this->init_profile();
       $this->init_profile();

    }
    protected function init_profile(){
        $this->arrAPI = $this->api_profile();
    }

    abstract protected function init_default_interceptor();

    abstract protected function api_profile();

    function get_profile(){
        return $this->arrAPI;
    }

    function add_profile(APIInfo $profile) {
        $this->arrAPI[] = $profile;
    }

    function update_profile(){
        $this->arrAPI = $this->api_profile();
    }

    function setInterceptor($interceptor) {
        $this->obj = $interceptor;
    }
}