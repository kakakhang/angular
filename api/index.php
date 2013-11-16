<?php

require 'config/database.php';
require 'Service/Service.php';

\Service\Service::register_autoloader();

$service = new \Service\Service();
$service->set_service_configuration(new \Service\ServiceProfile());
$service->run();

?>