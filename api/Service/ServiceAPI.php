<?php

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

class ServiceAPI {
	var $slim; 
	var $auth;
    var $service_config;
	function __construct(){
		$this->slim =  new \Slim\Slim();
		$this->slim->contentType('application/json;charset=utf-8');
	}

	function register_api($http_method, $path, $function) {
    	switch ($http_method) {
    		case 'POST':
    			$this->slim->post($path, $function);
    			break;
    		case 'PUT':
    			$this->slim->put($path, $function);
    			break;
    		case 'DELETE':
    			$this->slim->delete($path, $function);
    			break;
    		default:
    			$this->slim->get($path, $function);
    			break;
    	}
	}

    function set_service_configuration(ServiceProfile $service_profile)
    {
        $this->service_config = $service_profile;
    }

    function set_up_configuration()
    {
        $arrProfiles = $this->service_config->arr_profile;
        foreach($profie as $arrProfiles)
        {
            $apis = $profie->get_api();
            foreach($api as $apis){
                $this->register_api($api->http_method, $api->path, array($api->obj,$api->function));
            }
        }
    }
	function run() {
		if( $this->authenticate($user, $function) === false) {
			header('HTTP/1.1 401 Unauthorized');
    		die('You are Unauthorized!!!!');
		}
        $this->set_up_configuration();
		$this->slim->run();
	}
	
}