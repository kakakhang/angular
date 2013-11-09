<?php

require 'config/database.php';
require 'Service/Service.php';

\Service\Service::register_autoloader();

$service = new \Service\Service();
$service->set_service_configuration(new \Service\ServiceProfile());
$service->run();

/*
$app = new \Slim\Slim();
$product = new Product();
$user = new User();

$app->config('debug', false);
$app->contentType('application/json;charset=utf-8');

$product = new AdminAPI(new Product());
$app->get('/products', array($product , "getProducts"));
$app->get('/products/start/:start/limit/:limit', array($product , "getProducts"));
$app->get('/products/:id', array($product , "getProduct"));
/*
//$app->get('/products/search/:query', 'findByName');
$app->post('/products', array($product , "addroduct"));
$app->put('/products/:id', array($product , "updateProduct"));
$app->delete('/products/:id', array($product , "deleteProduct"));

$app->get('/checkLogin', array($user , "checkLogin"));

$app->run();

/*
 * service init
 * service read config
 * service run
 *
 * */

?>