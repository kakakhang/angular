<?php

namespace Service\Implement;
use DataAccess\Query;

class Base {
	var $objQuery;
	function __construct() {		
		$this->objQuery = Query::getSingletonInstance();
	}
}