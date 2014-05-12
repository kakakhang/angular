<?php
namespace Service\Implement;

class General extends Base {
	function getShopInfo() {
		$info = $this->objQuery->getOne("select * from baseinfo",array());
        echo  json_encode($info);
	}

    function updateShopInfo(){
        $this->objQuery->delete('baseinfo','',array());
        $request = $this->objService->get_request();
        $params = json_decode($request->getBody());
        $result = $this->objQuery->insert(	'baseinfo',
            'name,address,phone01,phone02,email01,email02,company_name,latitude,longitude',
            array(
                !empty($params->name) ? $params->name : '',
                !empty($params->address) ? $params->address : '',
                !empty($params->phone01) ? $params->phone01 : '',
                !empty($params->phone02) ? $params->phone02 : '',
                !empty($params->email01) ? $params->email01 : '',
                !empty($params->email02) ? $params->email02 : '',
                !empty($params->company_name) ? $params->company_name : '',
                !empty($params->latitude) ? $params->latitude : '',
                !empty($params->longitude) ? $params->longitude : '',
            )
        );
        echo  json_encode($result);
    }
}

