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
use Service\Implement\Security as SecurityImpl;


class Security extends Base{

    protected function   init_default_interceptor(){
        $this->obj = new AdminInterceptor(new SecurityImpl());
    }

    protected function api_profile()
    {
        return array(
            new APIInfo('/admin/login', APIInfo::HTTP_POST, 'login'),
        );
    }

}