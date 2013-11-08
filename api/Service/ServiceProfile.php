<?php
/**
 * Created by JetBrains PhpStorm.
 * User: khanghuynh
 * Date: 11/8/13
 * Time: 4:02 PM
 * To change this template use File | Settings | File Templates.
 */

class ServiceProfile {
    var $arr_profile = array();
    function __construct(){

    }
    function register_profile($profile)
    {
        $this->arr_profile[] = $profile;
    }
    function get_define_api() {

    }

}