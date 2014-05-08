<?php

namespace Service\Interceptor;
use Service\Interceptor\AbstractInterceptor;

class AdminInterceptor extends AbstractInterceptor {
	function before($object, $method, $args){
        /*
		$userSession = UserSession::getInstance();
		if( !$userSession->isLogged()) {
			header('HTTP/1.1 401 Unauthorized');
    		die('You are Unauthorized');
		}

		echo "before call:  $method ;";

        function around($object, $method, $args){
            print "before $method <br />";
            $value = $this->callMethod($method, $args);
            print "after $method <br />";
            return $value;
	    }
        */

	}
}

