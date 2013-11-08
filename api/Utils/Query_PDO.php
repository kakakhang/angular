<?php

require  'IQuery.php';
require  'Database.php';

class Query_PDO implements IQuery{
    var $where = '';
    var $arrWhereVal = array();
    var $conn;
    var $groupby = '';
    var $order = '';
    var $option = '';
	var $sqlStatement='';
    function __construct() {    	
		 $this->db = new Database();
    }

 	/**
     * COUNT
     *
     * @param string $table
     * @param string $where 
     * @param array $arrWhereVal 
     * @return integer 
     */
    
    function count($table, $where = "", $arrWhereVal = array()) {
        if(strlen($where) <= 0) {
            $sqlse = "SELECT COUNT(*) FROM $table";
        } else {
            $sqlse = "SELECT COUNT(*) FROM $table WHERE $where";
        }
        $arrRet = $this->getOne($sqlse, $arrWhereVal);
        $rowNum = $arrRet[0];
        return  $rowNum;       
    }

/**
     * SELECT
     *
     * @param string $col 
     * @param string $table 
     * @param string $where 
     * @param array $arrWhereVal 
     * @param integer $fetchmode 
     * @return array|null
     */
    function select($col, $table, $where = "", $arrWhereVal = array(), $fetchmode = PDO::FETCH_ASSOC) {
        $sqlse = $this->buildQueryStatement($col, $table, $where, $arrWhereVal);
        return $this->getAll($sqlse, $arrWhereVal, $fetchmode);
    }


    function commit() {
        return $this->db->commit();
    }


    function begin() {
        return $this->db->beginTransaction();
    }


    function rollback() {
        return $this->db->rollback();
    }

    function getAll($sql, $arrval = array(), $fetchmode = PDO::FETCH_ASSOC) {
    	try{
    		$sth = $this->db->prepare($sql);
	        if ($arrval == null){
	        	$sth->execute();
	        }else{
	        	$sth->execute($arrval);
        }
		$result = $sth->fetchAll($fetchmode);        
        return $result;
    		
    	}
   		 catch (PDOException $e){
	          echo 'Caught exception: ',  $e->getMessage(), "\n";
	    }
    }
	function getSqlQuery(){
		return $this->sqlStatement;
	}
    function buildQueryStatement($col, $table, $where = '', &$arrWhereVal = null) {
        $this->sqlStatement = "SELECT $col FROM $table";
        if (strlen($where) >= 1) {
            $this->sqlStatement .= " WHERE $where";
        } elseif (strlen($this->where) >= 1) {
            $this->sqlStatement .= " WHERE " . $this->where;
            $arrWhereValForEval = (array)$arrWhereVal;
            if (empty($arrWhereValForEval)) {
                $arrWhereVal = $this->arrWhereVal;
            }
        }
        $this->sqlStatement .= ' ' . $this->groupby . ' ' . $this->order . ' ' . $this->option;
        return $this->sqlStatement;
    }

    /**
     * INSERT
     *
     * @param string $table
     * @param array $sqlval array
     * @return
     * ex:
     * 	$objQuery = Query::getSingletonInstance();
     *  $arrVal = array('01','David Beckham Teo');
	 *	$count  = $objQuery->insert('emp', 'MaNV,TenNv',$arrVal); 
     */
    function insert($table, $strcol,$arrVal) {
    	if(count($arrVal)==0) return false;
    	try {
    		$str1= str_replace(array(';','.','/',' ','  ','   ','    '),',',$strcol);
    		$str1 = trim($str1,',');
    		$str2=",";
	    	foreach ($arrVal as $item)
	    	{
	    		if(trim($item) != ''){
	    			$str2.=	"'".trim($item)."',";
	    		}
	    	} 
	    	$str2= trim($str2,',');            
	        $sqlin = "INSERT INTO $table(" . $str1. ") VALUES (" . $str2 . ")";
	       	$ret = $this->db->exec($sqlin);
       		return $ret;	      		
    	}
    	catch (PDOException $e){
	          echo  $e->getMessage();
	    }
    	
    }
	/**
	 *   $objQuery = new SC_Query_Ex();
     *   $name = 'Test';
     *   $objQuery->update("dtb_plugin", array('enable'=>'0'), "plugin_name = ?", array($name));
	 */

    function update($table,$sqlval, $where = "", $arrWhereVal = array()) {
	    try {
		    	$arrCol = array();
		
		        foreach ($sqlval as $key => $val) {
		   			$arrCol[] = " $key = '$val' ";
		        }
		        if (empty($arrCol)) {
		            return false;
		        }
		        $strcol = implode(', ', $arrCol);
		        $sqlup = "UPDATE $table SET $strcol";
		        if (strlen($where) >= 1) {
		            $sqlup .= " WHERE $where";
		        }
		        $sth = $this->db->prepare($sqlup);
		        $count = $sth->execute($arrWhereVal);
		      	return $count;
	    	}
	    catch (PDOException $e){
		    echo  $e->getMessage();
	 	}
    }


    function max($col, $table, $where = "", $arrval = array()) {
        $ret = $this->get("MAX($col)", $table, $where, $arrval);
        return $ret;
    }


    function min($col, $table, $where = "", $arrval = array()) {
        $ret = $this->get("MIN($col)", $table, $where, $arrval);
        return $ret;
    }


    function get($col, $table, $where = "", $arrWhereVal = array(),$fetch = PDO::FETCH_ASSOC) {
    	try {
	    	$sqlse = $this->getSql($col, $table, $where, $arrWhereVal);
			$result = array();
			$sth =$this->db->prepare($sqlse);
			$sth->execute($arrWhereVal);		
			while ($row =$sth->fetch($fetch))
			{
				$result[] = $row;
			}		     
	        return $result;    		   		
    	}
    	catch (PDOException $e){
	          echo 'Caught exception: ',  $e->getMessage(), "\n";
	    }    	
    }

    function getOne($sql, $arrval = array()) {
    	try {
	    	$sth = $this->db->prepare($sql);	    	
			$sth->execute($arrval);
			$result = $sth->fetch();        
	        return $result;	      		
    	}
    	catch (PDOException $e){
	          echo 'Caught exception: ',  $e->getMessage(), "\n";
	    }   
    }
    
    /*
     *  $arrval = array('1','10');
	 *	$count=$a->delete('emp', 'MaNv > ? AND MaNv < ?',$arrval);
     * */
    function delete($table, $where = "", $arrval = array()) {
	    try {
		    	if(strlen($where) <= 0) {
		            $sqlde = "DELETE FROM $table";
		        } else {
		            $sqlde = "DELETE FROM $table WHERE $where";
		        }
		       $sth= $this->db->prepare($sqlde);
		        $ret = $sth->execute($arrval);
		        return $ret;    		     		
	    	}
	    catch (PDOException $e){
		          echo  $e->getMessage();
		    }  		
	    }

}

?>
