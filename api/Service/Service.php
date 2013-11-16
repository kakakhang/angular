<?php

namespace Service;
require '/Slim/Slim.php';

class Service {
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

    public static function register_autoloader()
    {
        spl_autoload_register(__NAMESPACE__ . "\\Service::autoload");
    }

    public static function autoload($className)
    {
        $thisClass = str_replace(__NAMESPACE__.'\\', '', __CLASS__);

        $baseDir = __DIR__;

        if (substr($baseDir, -strlen($thisClass)) === $thisClass) {
            $baseDir = substr($baseDir, 0, -strlen($thisClass));
        }

        $className = ltrim($className, '\\');
        $fileName  = $baseDir;
        $namespace = '';
        if ($lastNsPos = strripos($className, '\\')) {
            $namespace = substr($className, 0, $lastNsPos);
            $className = substr($className, $lastNsPos + 1);
            $fileName  .= str_replace('\\', DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
        }
        $fileName .= str_replace('_', DIRECTORY_SEPARATOR, $className) . '.php';

        if (file_exists($fileName)) {
            require $fileName;
        }
    }
    function set_up_configuration()
    {
        $arrProfiles = $this->service_config->arr_profile;
        foreach($arrProfiles as $profile)
        {
            $apis = $profile->get_api();
            foreach($apis as $api){
                $this->register_api($api->http_method, $api->path, array($api->obj,$api->function));
            }
        }
    }

    public static function getSingletonInstance() {
        if (!isset(self::$instance)){
            $className = __CLASS__;
            self::$instance = new $className;
        }
        return self::$instance;
    }

    function get_request(){
        return $this->slim->request();
    }

	function run() {
        /*
		if( $this->authenticate($user, $function) === false) {
			header('HTTP/1.1 401 Unauthorized');
    		die('You are Unauthorized!!!!');
		}
        */
        $this->set_up_configuration();
		$this->slim->run();
	}
	
}