<?php
/**
 * Created by JetBrains PhpStorm.
 * User: khanghuynh
 * Date: 11/8/13
 * Time: 4:02 PM
 * To change this template use File | Settings | File Templates.
 */

class ServiceProfile {
    var $arr;
    function __construct(){
        $product = new AdminAPI(new Product());
        $app->get('/products', array($product , "getProducts"));
    }
}