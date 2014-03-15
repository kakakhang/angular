<?php
namespace Service\Implement;


class Product extends Base {
    /*this is new comment*/
	function getProducts($start = 0,$limit = 100) {
		$products = $this->objQuery->select("*","product LIMIT $limit OFFSET $start");
        echo  json_encode($products);
	}

	function getProduct($product_id) {
		$product = $this->objQuery->select('*','product', ' product_id = ?', array($product_id),\PDO::FETCH_OBJ);
		echo  json_encode($product);
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
                            m_status.name
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

        $result = $this->objQuery->getAll($sql,$arrCondition);
        echo json_encode($result);
    }
}

