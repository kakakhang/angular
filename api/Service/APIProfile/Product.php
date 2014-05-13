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
            new APIInfo('/products', APIInfo::HTTP_GET, 'getProducts'),
            new APIInfo('/products/start/:start/limit/:limit', APIInfo::HTTP_GET,  'getProducts'),
            new APIInfo('/product/:id', APIInfo::HTTP_GET,  'getProduct'),
            new APIInfo('/product', APIInfo::HTTP_POST,  'insertProduct'),
            new APIInfo('/product/:id', APIInfo::HTTP_PUT, 'updateProduct'),
            new APIInfo('/product/:id', APIInfo::HTTP_DELETE, 'deleteProduct'),
            new APIInfo('/productSearchCondition', APIInfo::HTTP_GET,  'getProductSearchCondition'),
            new APIInfo('/product/search/:condition', APIInfo::HTTP_GET, 'getProductBySearchCondition'),
            new APIInfo('/productImage', APIInfo::HTTP_POST, 'uploadImage'),
            new APIInfo('/productImage/:imageName', APIInfo::HTTP_DELETE, 'deleteImage'),
        );
    }

}