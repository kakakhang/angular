<?php
namespace DataAccess;

interface IQuery
{
    function count($table, $where, $arrWhereVal);    
    function select($col, $table, $where, $arrWhereVal, $fetchmode);
    function commit();
    function begin();
    function rollback();    
    function getOne($sql, $arrval);
    function execute($sql,$arrval);
    function getAll($sql, $arrval, $fetchmode);
	function insert($table, $strcol,$arrVal);
	function delete($table, $where, $arrval);
	function update($table,$sqlval, $where, $arrWhereVal);
	function max($col, $table, $where , $arrval );
	function min($col, $table, $where , $arrval);
	
}
?>