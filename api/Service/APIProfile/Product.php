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
            new APIInfo('/products', APIInfo::HTTP_GET, $this->obj, 'getProducts'),
            new APIInfo('/products/start/:start/limit/:limit', APIInfo::HTTP_GET, $this->obj, 'getProducts'),
            new APIInfo('/product/:id', APIInfo::HTTP_GET, $this->obj, 'getProduct'),
            new APIInfo('/product', APIInfo::HTTP_POST, $this->obj, 'addroduct'),
            new APIInfo('/product/:id', APIInfo::HTTP_PUT, $this->obj, 'updateProduct'),
            new APIInfo('/product/:id', APIInfo::HTTP_DELETE, $this->obj, 'deleteProduct'),
            new APIInfo('/productSearchCondition', APIInfo::HTTP_GET, $this->obj, 'getProductSearchCondition'),
            new APIInfo('/product/search/:condition', APIInfo::HTTP_GET, $this->obj, 'getProductBySearchCondition'),
        );
    }

}