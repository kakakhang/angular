<?php
/**
 * Created by JetBrains PhpStorm.
 * User: khanghuynh
 * Date: 11/8/13
 * Time: 4:38 PM
 * To change this template use File | Settings | File Templates.
 */
namespace Service\APIProfile;

use Service\APIProfile\Base;
use Service\Interceptor\AdminInterceptor;
use Service\APIProfile\APIInfo;
use Service\Implement\Product as ProductImpl;


class Product extends Base{

    protected function   init_default_interceptor(){
        $this->obj = new AdminInterceptor(new ProductImpl());
    }

    protected function api_profile()
    {
        return array(
            new APIInfo('/product/:id', 'GET', $this->obj, 'getProduct'),
            new APIInfo('/products', 'GET', $this->obj, 'getProducts'),
            new APIInfo('/products/start/:start/limit/:limit', 'GET', $this->obj, 'getProducts'),
        );
    }

}