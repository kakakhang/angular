<?php
require_once 'BaseService.php';

class ProductService extends BaseService {

	function getProducts($start = 0,$limit = 100) {
		$products = $this->objQuery->select("*","product LIMIT $limit OFFSET $start", "",null,PDO::FETCH_OBJ);
		echo  json_encode($products);
	}

	function getProduct($product_id) {
		$product = $this->objQuery->select('*','product', ' product_id = ?', array($product_id),PDO::FETCH_OBJ);
		echo  json_encode($product);
	}

	function addProduct() {
		$request = Slim::getInstance()->request();
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
		$request = Slim::getInstance()->request();
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
}

