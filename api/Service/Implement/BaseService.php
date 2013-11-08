<?php 
class BaseService {
	var $objQuery;
	function __construct() {		
		$this->objQuery = Query::getSingletonInstance();
	}
}