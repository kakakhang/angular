<?php
namespace DataAccess;

interface IQuery
{
    function count($table, $where, $arrWhereVal);    
    function select($col, $table, $where, $arrWhereVal, $fetchmode);
    function getOne($sql, $arrval);
    function getAll($sql, $arrval, $fetchmode);
    /*
     *  $arrVal = array('MaNV'=>'01','TenNV'->'David Beckham Teo');
	 *	$lastIdInserted  = $objQuery->insert('emp',$arrVal);
     *
     */
	function insert($table, $arrKeyVal);
    /*
     *   $arrval = array('1','10');
     *	$count=$a->delete('emp', 'MaNv > ? AND MaNv < ?',$arrval);
     */
	function delete($table, $where, $arrval);
    /*
     * $objQuery->update("tableName", array('columnName1'=>'0'), "ColumnId = ?", array(1));
     */
	function update($table,$arrKeyVal, $where, $arrWhereVal);
	function max($col, $table, $where , $arrval );
	function min($col, $table, $where , $arrval);
}
?>