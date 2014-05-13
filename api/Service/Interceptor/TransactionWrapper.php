<?php

namespace Service\Interceptor;
use DataAccess\Query;

class TransactionWrapper{

	var $objAPI;
	var $objQuery;
	function __construct($apiInstance) {
		$this->objAPI = $apiInstance;
		$this->objQuery = Query::getSingletonInstance();
	}
	function setAPIObject($apiInstance){
		$this->objAPI = $apiInstance;
	}
	public function __call($method, $args) {
		$executeTransactionKey   = array('insert','update','delete','add','exec','execute');
		$isExecTrans = false;
		foreach($executeTransactionKey as $key){
			
			$pos = strpos($method, $key);
			if($pos == 0){
				$isExecTrans = true;
				break;
			}
		}
		if($isExecTrans){
			try { 
				$this->objQuery->begin(); 
				call_user_func_array(array($this->objAPI, $method), $args);
				$this->objQuery->commit(); 
			} catch(\PDOExecption $e) { 
				$this->objQuery->rollback(); 
				print "Error!: " . $e->getMessage() . "</br>"; 
			}
			return;
		}
        return call_user_func_array(array($this->objAPI, $method), $args);
    }
	
}