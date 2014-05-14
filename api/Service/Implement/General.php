<?php
namespace Service\Implement;
use Utils\Helper;


class General extends Base {
	function getShopInfo() {
		$info = $this->objQuery->getOne("select * from baseinfo",array());
        echo  json_encode($info);
	}

    function updateShopInfo(){

        $request = $this->objService->get_request();
        $params = json_decode($request->getBody());
        $arrVal = Helper::convertRequestParamToArray($params);
        $this->objQuery->delete('baseinfo','',array());
        $result = $this->objQuery->insert('baseinfo',$arrVal);
        echo  json_encode($result);
    }
}

