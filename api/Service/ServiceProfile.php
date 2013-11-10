<?php
/**
 * Created by JetBrains PhpStorm.
 * User: khanghuynh
 * Date: 11/8/13
 * Time: 4:02 PM
 * To change this template use File | Settings | File Templates.
 */

namespace Service;

class ServiceProfile {
    var $arr_profile = array();

    function __construct(){
        $this->register_profile(new \Service\APIProfile\Product());
    }
    function register_profile($profile)
    {
        $this->arr_profile[] = $profile;
    }
}