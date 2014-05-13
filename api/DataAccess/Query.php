<?php

namespace DataAccess;
use DataAccess\QueryPDO;

class Query extends  \DataAccess\AbstractQuery{

	private  static $instance;
	
    function __construct() {
    	$this->setIQuery(new QueryPDO());
    }
	
	static function getSingletonInstance() {
	    if (!isset(self::$instance)){
			$className = __CLASS__;
	        self::$instance = new $className;
	    }
	    return self::$instance;
	}    
}

?>
