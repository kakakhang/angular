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
    function getSql(){
    	return $this->IQuery->getSqlQuery();
    }
    function get($col, $table, $where, $arrWhereVal,$fetch = PDO::FETCH_ASSOC){
    	return $this->IQuery->get($col, $table, $where, $arrWhereVal,$fetch);
    }
    function execute($sql,$arrVal = array()){
        return $this->IQuery->execute($sql,$arrVal);
    }
}

?>
