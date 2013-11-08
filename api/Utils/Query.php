<?php

require 'AbstractQuery.php';
require 'Query_PDO.php';
class Query extends  AbstractQuery{	
	private  static $instance;
    function __construct() {
    	$this->setIQuery(new Query_PDO());      		
    }
	static function getSingletonInstance() {
	    if (!isset(self::$instance)){
			$className = __CLASS__;
	        self::$instance = new $className;
	    }
	    return self::$instance;
	}
    function getSql(){
    	return $this->IQuery->getSqlQuery();
    }
    function get($col, $table, $where, $arrWhereVal,$fetch = PDO::FETCH_ASSOC){
    	return $this->IQuery->get($col, $table, $where, $arrWhereVal,$fetch);
    }      
}

?>
