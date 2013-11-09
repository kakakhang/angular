<?php

require_once 'Base.php';

class UserService extends BaseService {

	function logged($a) {
		if($a != 1) {
			header('HTTP/1.1 401 Unauthorized');
    		die('You are Unauthorized');
    	}
    	else 
    	{
    		return true;
    	}
	}

	private function _getUsers( $start = 0,$limit = 100 ) {
		$users = $this->objQuery->select("*","user LIMIT $limit OFFSET $start", "",null,PDO::FETCH_OBJ);
		return $users;
	}

	private function _getUser( $email ) {
		$user = $this->objQuery->select("*","user", "email = ?", array($email), PDO::FETCH_OBJ);
		return $user;
	}

	function getUsers($start = 0,$limit = 100) {
		
		echo  json_encode($this->_getUsers($start, $limit));
	}

	function getUser( $email = '' ) {
		
		echo  json_encode($this->_getUser($email));
	}
	
	

	function checkLogin(){
		
	}
	function login() {
		$request = \Slim\Slim::getInstance()->request();
		$params = json_decode($request->getBody());	
		$userSession = UserSession::getInstance();
		$exist_user = $this->objQuery->count('user','email = ? and password = ?', array($params->email,$params->password));
		if($exist_user == 0){
			echo 0; die;
		}
		$user = $this->_getUser($params->email);
		$userSession->setUserSession($user->login_id, $user->login_name, $user->role, $user->privilege);
		echo 1;
	}
}