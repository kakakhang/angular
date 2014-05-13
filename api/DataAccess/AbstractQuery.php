<?php

namespace DataAccess;

class AbstractQuery  {		
	protected $IQuery;	
    function __construct() {
    	
    }	
	function setIQuery($Iquery)
	{
		$this->IQuery = $Iquery;
	}   
	public function __call($method, $args) {
        return call_user_func_array(array($this->IQuery, $method), $args);
    }
}

?>
