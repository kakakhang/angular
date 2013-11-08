<?php 
class Model {
	var $objQuery;
	function __construct() {		
		$this->objQuery = Query::getSingletonInstance();
	}
}