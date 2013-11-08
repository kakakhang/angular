<?php
/**
 * Created by JetBrains PhpStorm.
 * User: khanghuynh
 * Date: 11/8/13
 * Time: 4:38 PM
 * To change this template use File | Settings | File Templates.
 */

require 'BaseProfile.php';

class ProductProfile extends BaseProfile {

    protected function  init_default_interceptor(){
        $this->obj = new AdminInterceptor(new ProductService());
    }

    protected  function api_profile()
    {
        return array(
            new APIInfo('/products', 'GET', $this->obj, 'get_Products'),
            new APIInfo('/products/start/:start/limit/:limit', 'GET', $this->obj, 'get_Products'),
        );
    }

}