<?php
namespace Service\Implement;
use Utils\ImageUpload;
use Utils\Helper;

class Product extends Base {
	function getProducts($start = 0,$limit = 100) {
		$products = $this->objQuery->select("*","product LIMIT $limit OFFSET $start");
        echo  json_encode($products);
	}

	function getProduct($product_id) {
        $sqlStatus = "   Select   product_status.status_id  as id,
                                  m_status.name             as text
                          From product_status
                          Join m_status on product_status.status_id = m_status.status_id
                          Where product_status.product_id = ?";

        $sqlCategory = "   Select   product_category.category_id as id,
                                    m_category.category_name    as text
                          From product_category
                          Join m_category on product_category.category_id = m_category.category_id
                          Where product_category.product_id = ?";

       // $product = $this->objQuery->getOne($sql,array($product_id));
		$product = $this->objQuery->select('*','product', ' product_id = ?', array($product_id),\PDO::FETCH_OBJ);
        $status = $this->objQuery->getAll($sqlStatus,array($product_id));
        $category = $this->objQuery->getAll($sqlCategory,array($product_id));
        $product[0]->category = $category;
        $product[0]->status = $status;
		echo  json_encode($product[0]);
	}
    function getProductSearchCondition(){
        $status = $this->objQuery->select('status_id  as id, name as text','m_status', ' type = ?', array(1),\PDO::FETCH_OBJ);
        $category = $this->objQuery->select('category_id as id, category_name as text','m_category',\PDO::FETCH_OBJ);
        echo  json_encode(array('cat'=>$category,'status'=>$status));
    }

    function updateProductStatus($product_id,$status){
        $this->objQuery->delete('product_status', 'product_id = ?', array($product_id));
        foreach($status as $s){
			$this->objQuery->insert('product_status',array('status_id' => $s->id ,'product_id' =>$product_id));
        }	
    }

    function updateProductCategory($product_id,$cats){
        $this->objQuery->delete('product_category', 'product_id = ?', array($product_id));
        foreach($cats as $cat){
			$this->objQuery->insert('product_category',array('category_id' => $cat->id ,'product_id' =>$product_id));
        }
    }

	function insertProduct() {
		$request = $this->objService->get_request();
		$params = json_decode($request->getBody());		
		$insertArr = Helper::convertRequestParamToArray($params);
		$insertArr['create_date'] = date('Y/m/d H:i:s');
		$insertArr['update_date'] = date('Y/m/d H:i:s');
		$insertArr['delete_flg'] = 0;
        $product_id = $this->objQuery->insert('product',$insertArr);
        $this->updateProductStatus($product_id,$params->status);
        $this->updateProductCategory($product_id,$params->category);
		echo  json_encode(true);
	}

	function updateProduct($product_id) {
        $request = $this->objService->get_request();
		$params = json_decode($request->getBody());
        $arrVal = Helper::convertRequestParamToArray($params);
        $arrVal['update_date'] = date('Y/m/d H:i:s');
        $arrVal['delete_flg']  = 0;
        $this->objQuery->update('product',$arrVal,'product_id = ?',array($product_id));
        $this->updateProductStatus($product_id,$params->status);
        $this->updateProductCategory($product_id,$params->category);
		echo  json_encode(true);
	}

	function deleteProduct($product_id) {
		$result = $this->objQuery->delete('product', 'product_id = ?', array($product_id));
		echo  json_encode($result);
	}

    function getProductBySearchCondition($condition){
        $params = json_decode(urldecode($condition));
        $select = "    Select  * From Product";
        $where = '';
        if(isset($params)){
            $where .= " Where 1=1 ";
        }
        $arrCondition = array();
        if(isset($params->category_id) && strlen($params->category_id) > 0){
            $arrCondition[] = $params->category_id;
            $where .= " and Product.product_id In ( Select Product_id From Product_Category Where Category_id = ?) ";
        }
        if(isset($params->product_id) && strlen($params->product_id) > 0 ){
            $arrCondition[] = $params->product_id;
            $where .= "  and Product.product_id = ? ";
        }
        if(isset($params->name) && strlen($params->name) > 0){
            $arrCondition[] = "%$params->name%";
            $where .= "  and Product.name LIKE ? ";
        }
        if(isset($params->price_sale_from) && strlen($params->price_sale_from) > 0){
            $arrCondition[] = $params->price_sale_from;
            $where .= "  and Product.price_sale >= ? ";
        }
        if(isset($params->price_sale_to) && strlen($params->price_sale_to) > 0){
            $arrCondition[] = $params->price_sale_to;
            $where .= "  and Product.price_sale <= ? ";
        }
        if(isset($params->status) && count($params->status)> 0){
            $whereStatus = "(";
            foreach( $params->status as $status_id ){
                $arrCondition[] = $status_id;
                $whereStatus .= "Product_Status.status_id = ? or ";
            }
            $whereStatus = substr($whereStatus,0,strlen($whereStatus)-3) . " )";
            $status_sql = " Product.product_id in ( Select Product_id From Product_Status Where  $whereStatus ) ";
            $where .= " and $status_sql ";
        }
        if(isset($params->display_mode )){
            $arrCondition[] = $params->display_mode;
            $where .= "  and Product.display_mode = ? ";
        }

        $sql = $select  . $where;

        if(isset($params->currentPage) && isset($params->pageSize)){
            $offset = $params->pageSize * ($params->currentPage - 1);
            $sql .= "  LIMIT $params->pageSize OFFSET $offset";
        }
        $countSql = " Select count(*) as count From Product $where " ;
        $rowCount = $this->objQuery->getOne($countSql,$arrCondition);
        $result = $this->objQuery->getAll($sql,$arrCondition);
        echo json_encode(array('count'=>$rowCount->count,'products'=>$result));
    }


    function uploadImage(){
        //check if this is an ajax request
        $isXHR = $this->objService->isAjax();
        if (!$isXHR){
            $this->objService->responseError();
        }

        // check $_FILES['file'] not empty
        if(!isset($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name']))
        {
            die('Something wrong with uploaded file, something missing!'); // output error when above checks fail.
        }

        $image_upload = new ImageUpload($_FILES,'file');
        $result = $image_upload->resizeImage();

        if($result){
            echo json_encode($image_upload->new_image_name);
        }else{
            $this->objService->responseError();
        }
    }

    function delImage($image_name){
        $image_path = realpath("upload/")."/$image_name";
        if(file_exists($image_path)){
            unlink($image_path);
        }
        echo json_encode(array('status'=>'OK'));
    }


}

