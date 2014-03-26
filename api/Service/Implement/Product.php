<?php
namespace Service\Implement;
use Utils\ImageUpload;

class Product extends Base {
	function getProducts($start = 0,$limit = 100) {
		$products = $this->objQuery->select("*","product LIMIT $limit OFFSET $start");
        echo  json_encode($products);
	}

	function getProduct($product_id) {
		$product = $this->objQuery->select('*','product', ' product_id = ?', array($product_id),\PDO::FETCH_OBJ);
		echo  json_encode($product[0]);
	}
    function getProductSearchCondition(){
        $status = $this->objQuery->select('*','m_status', ' type = ?', array(1),\PDO::FETCH_OBJ);
        $category = $this->objQuery->select('*','m_category',\PDO::FETCH_OBJ);
        echo  json_encode(array('cat'=>$category,'status'=>$status));
    }

	function addProduct() {

		$request = $this->objService->get_request();
		$params = json_decode($request->getBody());
		$result = $this->objQuery->insert(	'product',
											'	price_standard,
												price_sale,
												list_image,
												main_image,
												description,
												name,
												stock,
												create_date,
												update_date,
												delete_flg,
												display_mode
											',
											array(
												$params->price_standard,
												$params->price_sale,
												$params->list_image,
												$params->main_image,
												$params->description,
												$params->name,
												$params->stock,
												$params->create_date,
												$params->update_date,
												$params->delete_flg,
												$params->display_mode
											)
		);
		echo  json_encode($result);
	}

	function updateProduct($product_id) {
        $request = $this->objService->get_request();
		$params = json_decode($request->getBody());
		$result = $this->objQuery->update(	'product', 
										   	array(
										   		'price_standard' => $params->price_standard,
										   		'price_sale' => $params->price_sale,
										   		'list_image' => $params->list_image,
										   		'main_image' => $params->main_image,
										   		'description' => $params->description,
										   		'name' => $params->name,
										   		'stock' => $params->stock,
										   		'price_standard' => $params->price_standard,
										   		'update_date' => $params->update_date,
										   		'delete_flg' => $params->delete_flg,
										   		'display_mode' => $params->display_mode
										   	),
										   	'product_id = ?',
										   	array($product_id)
		);
		echo  json_encode($result);
	}

	function deleteProduct($product_id) {
		$result = $this->objQuery->delete('product', 'product_id = ?', array($product_id));
		echo  json_encode($result);
	}

    function getProductBySearchCondition($condition){
        $params = json_decode(urldecode($condition));
        $sql = "    Select  Product.*,
                            Product_Category.category_id,
                            m_category.category_name,
                            Product_Status.status_id,
                            m_status.name as status_name
                    From Product
                    Left Join Product_Category on Product.Product_id = Product_Category.Product_id
                    Left Join m_category on m_category.category_id = Product_Category.category_id
                    Left Join Product_Status on Product.Product_id = Product_Status.Product_id
                    Left Join m_status on m_status.status_id = Product_Status.status_id ";
        if(isset($params)){
            $sql .= " Where 1=1 ";
        }
        $arrCondition = array();
        if(isset($params->category_id) && strlen($params->category_id) > 0){
            $arrCondition[] = $params->category_id;
            $sql .= " and Product_Category.category_id = ? ";
        }
        if(isset($params->product_id) && strlen($params->product_id) > 0 ){
            $arrCondition[] = $params->product_id;
            $sql .= "  and Product.product_id = ? ";
        }
        if(isset($params->name) && strlen($params->name) > 0){
            $arrCondition[] = "%$params->name%";
            $sql .= "  and Product.name LIKE ? ";
        }
        if(isset($params->price_sale_from) && strlen($params->price_sale_from) > 0){
            $arrCondition[] = $params->price_sale_from;
            $sql .= "  and Product.price_sale >= ? ";
        }
        if(isset($params->price_sale_to) && strlen($params->price_sale_to) > 0){
            $arrCondition[] = $params->price_sale_from;
            $sql .= "  and Product.price_sale <= ? ";
        }
        if(isset($params->status) && count($params->status)> 0){
            $status_sql = "( ";
            foreach( $params->status as $status_id ){
                $arrCondition[] = $status_id;
                $status_sql .= "Product_Status.status_id = ? or ";
            }
            $status_sql = substr($status_sql,0,strlen($status_sql)-3) . " )";
            $sql .= " and $status_sql ";
        }
        if(isset($params->display_mode )){
            $arrCondition[] = $params->display_mode;
            $sql .= "  and Product.display_mode = ? ";
        }

        $result = $this->objQuery->getAll($sql,$arrCondition);
        echo json_encode($result);
    }


    function uploadImage(){
        $this->objService->responseError();
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
            echo json_encode($image_upload->dest_rand_image_name);
        }else{
            $this->objService->responseError();
        }
    }


}

