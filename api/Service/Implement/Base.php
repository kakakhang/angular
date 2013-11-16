<?php

namespace Service\Implement;
use DataAccess\Query;
use Service\Service;

class Base {
	var $objQuery;
    var $objService;
	function __construct() {		
		$this->objQuery = Query::getSingletonInstance();
        $this->objService = Service::getSingletonInstance();
	}
}