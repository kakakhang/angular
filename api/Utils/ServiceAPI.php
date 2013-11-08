<?php

class ServiceAPI {
	var $slim; 
	var $auth;
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
	function run() {
		if( $this->authenticate($user, $function) === false) {
			header('HTTP/1.1 401 Unauthorized');
    		die('You are Unauthorized!!!!');
		}
		$this->slim->run();
	}
	
}