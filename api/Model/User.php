<?php 

require_once 'Model.php';

class User extends Model {

	function logIn() {
		$request = \Slim\Slim::getInstance()->request();
		$params = json_decode($request->getBody());
		$userSession = UserSession::getInstance();
		/*
		if(!isset($userSession->get('login_id'))) {
			if($this->checkLogin($params->email,$params->password)) {
				$userSession->setUserSession($login_id,$login_name,$role,$privilege);
				echo 'true'
				return;
			} 
			else {
				echo 'false';
				return;
			}
		} 
		echo 'true';
		*/

	}
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