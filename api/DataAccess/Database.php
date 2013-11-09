<?php

namespace DataAccess;

class Database extends \PDO{
	function __construct() {	
		try {
			$options = array(
	            \PDO::ATTR_PERSISTENT => true,
	            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION
	        );
	        $dsn = DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME;
	        parent::__construct($dsn, DB_USER, DB_PASSWORD, $options);	
	    }
		catch(PDOException $e)
	    {
	    	echo $e->getMessage();
	    }
	}
}
?>