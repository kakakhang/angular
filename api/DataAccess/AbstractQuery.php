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
    /**
     * COUNT
     *
     * @param string $table
     * @param string $where 
     * @param array $arrWhereVal 
     * @return integer 
     */
    function count($table, $where, $arrWhereVal) {
       return $this->IQuery->count($table, $where, $arrWhereVal);
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
    function select($col, $table, $where, $arrWhereVal, $fetchmode) {
        return $this->IQuery->select($col, $table, $where, $arrWhereVal, $fetchmode);
    }
    function commit() {
        return $this->IQuery->commit();
    }
    function begin() {
        return $this->IQuery->begin();
    }
    function rollback() {
        return $this->IQuery->rollback();
    }
    function getAll($sql, $arrval = array()) {
		 return $this->IQuery->getAll($sql, $arrval);
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
    	return $this->IQuery->insert($table, $strcol,$arrVal);
    }
	/**
	 *   $objQuery = new SC_Query_Ex();
     *   $name = 'Test';
     *   $objQuery->update("dtb_plugin", array('enable'=>'0'), "plugin_name = ?", array($name));
	 */

    function update($table,$sqlval, $where, $arrWhereVal) {
	    return $this->IQuery->update($table,$sqlval, $where, $arrWhereVal);
    }

    function max($col, $table, $where, $arrval) {
       return $this->IQuery->max($col, $table, $where, $arrval);
    }
    function min($col, $table, $where, $arrval) {
       return $this->IQuery->min($col, $table, $where, $arrval);
    }

    function getOne($sql, $arrval) {
		return $this->IQuery->getOne($sql, $arrval);   
    }
    
    /*
     *  $arrval = array('1','10');
	 *	$count=$a->delete('emp', 'MaNv > ? AND MaNv < ?',$arrval);
     * */
    function delete($table, $where , $arrval ) {
		return $this->IQuery->delete($table, $where , $arrval );
	}
}

?>
