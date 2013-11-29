<?php
namespace Service\Implement;


class Security extends Base {

    /* Check user login
     * return 0 : login fail     *
     * return 1 : login success
     */
    function login() {
        $params = $this->objService->get_request_params();
        $isSuccess = $this->objQuery->count('user','email= ? AND password = ?', array($params['email'],$params['password']));
        return json_encode($isSuccess);
    }
}

