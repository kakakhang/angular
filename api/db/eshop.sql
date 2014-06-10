/*
SQLyog Ultimate v10.42 
MySQL - 5.5.32 : Database - eshop
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`eshop` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `eshop`;

/*Table structure for table `baseinfo` */

DROP TABLE IF EXISTS `baseinfo`;

CREATE TABLE `baseinfo` (
  `name` text COLLATE utf8_unicode_ci,
  `address` text COLLATE utf8_unicode_ci,
  `phone01` text COLLATE utf8_unicode_ci,
  `fax` text COLLATE utf8_unicode_ci,
  `email01` text COLLATE utf8_unicode_ci,
  `company_name` text COLLATE utf8_unicode_ci,
  `phone02` text COLLATE utf8_unicode_ci,
  `email02` text COLLATE utf8_unicode_ci,
  `latitude` text COLLATE utf8_unicode_ci,
  `longitude` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `baseinfo` */

insert  into `baseinfo`(`name`,`address`,`phone01`,`fax`,`email01`,`company_name`,`phone02`,`email02`,`latitude`,`longitude`) values ('Cty vo trach nhiem huu han dau tu mao hiem','1 Le Duan - Quan 1 - TP HCM6666','0985563333',NULL,'eshop@yahoo.com','Khang Com tldeeee','0909686567','quadu@gmail.com','222222222','333333333');

/*Table structure for table `m_category` */

DROP TABLE IF EXISTS `m_category`;

CREATE TABLE `m_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` text COLLATE utf8_unicode_ci,
  `parent_id` int(11) DEFAULT NULL,
  `level` int(1) DEFAULT NULL,
  `display_order` int(11) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `m_category` */

insert  into `m_category`(`category_id`,`category_name`,`parent_id`,`level`,`display_order`) values (1,'Lenovo',0,1,0),(2,'sony japan',0,1,1),(3,'Samsung',0,1,2),(4,'HP',0,1,3),(5,'Toshiba',0,1,4),(10,'Ultrabook',4,2,9),(11,'Pavilion',4,2,10),(23,'KM 1223',1,2,0),(24,'TU 110',1,2,1),(25,'T 400',1,2,2),(26,'VAIO Z',2,2,0),(27,'VAIO S',2,2,1),(28,'ULTRA SLIM FIT',2,2,2);

/*Table structure for table `m_role` */

DROP TABLE IF EXISTS `m_role`;

CREATE TABLE `m_role` (
  `role_id` int(11) NOT NULL,
  `role_name` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `m_role` */

insert  into `m_role`(`role_id`,`role_name`) values (1,'administrator'),(2,'member'),(3,'guest');

/*Table structure for table `m_status` */

DROP TABLE IF EXISTS `m_status`;

CREATE TABLE `m_status` (
  `status_id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci,
  `type` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `m_status` */

insert  into `m_status`(`status_id`,`name`,`type`) values (1,'New',1),(2,'Sale',1),(3,'Hot',1),(4,'New order',2),(5,'Order cancel',2),(6,'Confirmed Order',2),(7,'Order complete',2);

/*Table structure for table `news` */

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `news_id` int(11) DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `title` text COLLATE utf8_unicode_ci,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `delete_flg` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `news` */

/*Table structure for table `order` */

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `order_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `order_address` text COLLATE utf8_unicode_ci,
  `order_name` text COLLATE utf8_unicode_ci,
  `order_phone_number` text COLLATE utf8_unicode_ci,
  `payment_total` decimal(10,0) DEFAULT NULL,
  `status` smallint(6) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `delete_flg` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `order` */

/*Table structure for table `order_detail` */

DROP TABLE IF EXISTS `order_detail`;

CREATE TABLE `order_detail` (
  `order_detail_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `product_name` text COLLATE utf8_unicode_ci,
  `quantity` int(11) DEFAULT NULL,
  `delete_flg` smallint(6) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `discount` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `order_detail` */

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `price_standard` decimal(10,0) DEFAULT NULL,
  `price_sale` decimal(10,0) DEFAULT NULL,
  `list_image` text COLLATE utf8_unicode_ci,
  `main_image` text COLLATE utf8_unicode_ci,
  `description` text COLLATE utf8_unicode_ci,
  `name` text COLLATE utf8_unicode_ci,
  `stock` int(11) DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `delete_flg` smallint(1) DEFAULT '0',
  `display_mode` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `product` */

insert  into `product`(`product_id`,`price_standard`,`price_sale`,`list_image`,`main_image`,`description`,`name`,`stock`,`create_date`,`update_date`,`delete_flg`,`display_mode`) values (1,12000000,11500000,'image1.jpg','','Day la san pham 1','Laptop Lenovo',12,'2014-04-27 13:34:31','2014-04-27 08:34:31',0,1),(2,12444444,18900000,'winter-206595581.jpg','blue-hills-640872318.jpg','Day la san pham 2','Laptop IBM',11,'2014-05-05 20:52:40','2014-05-05 15:52:40',0,0),(3,88888,33333,'winter-326008774.jpg','water-lilies-285774059.jpg','SP 3v55','Laptop Apple  khangkhin',23333,'2014-05-10 08:14:11','2014-05-13 16:12:44',0,1),(4,222222,5000000,'image4.jpg','image4_main.jpg','SP 4','Laptop Sony Vaio',14,'2014-04-12 07:51:44','2014-04-12 02:51:44',0,1),(5,12000000,11500000,'image1.jpg','','','Laptop HP',NULL,'2012-12-06 10:55:59','0000-00-00 00:00:00',0,0),(6,0,12,'','','','yy',NULL,'2012-12-06 10:53:38','0000-00-00 00:00:00',1,0),(7,88,12,'','','','56865865',NULL,'2012-12-06 10:38:26','0000-00-00 00:00:00',0,0),(8,90,90,'','','','lllll',NULL,'2012-12-06 10:59:10','0000-00-00 00:00:00',0,0),(9,111,2142,'','','sdfsdf','Khang',324,'2014-05-08 20:53:54','2014-05-08 15:53:54',0,1),(10,2,3,'null','null','null','1',4,'2014-04-27 12:08:27','2014-04-27 07:08:27',0,1),(11,2,2,'null','null','null','22',2,'2014-04-27 07:08:52','2014-04-27 07:08:52',0,1),(12,44,444,'NULL','NULL','NULL','444',444,'2014-04-27 07:13:10','2014-04-27 07:13:10',0,1),(13,555,55,'NULL','NULL','NULL','555',55,'2014-04-27 13:10:37','2014-04-27 08:10:37',0,1),(14,123,412,'winter-340252294.jpg','sunset-9639119.jpg','222222','trung trum cuoi',123,'2014-05-13 16:18:27','2014-05-13 16:18:27',0,1),(15,23,344,NULL,NULL,'5555','ttt',44,'2014-05-13 17:24:57','2014-05-13 17:24:57',0,1);

/*Table structure for table `product_category` */

DROP TABLE IF EXISTS `product_category`;

CREATE TABLE `product_category` (
  `category_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`category_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `product_category` */

insert  into `product_category`(`category_id`,`product_id`) values (1,1),(1,2),(1,4),(1,5),(1,6),(1,7),(1,9),(1,12),(1,15),(1,21),(2,3),(2,8),(3,3),(5,3);

/*Table structure for table `product_status` */

DROP TABLE IF EXISTS `product_status`;

CREATE TABLE `product_status` (
  `status_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`status_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `product_status` */

insert  into `product_status`(`status_id`,`product_id`) values (1,1),(1,3),(1,5),(1,6),(1,7),(1,8),(1,9),(1,12),(1,15),(1,21),(2,1),(2,3),(2,9),(3,3),(3,15);

/*Table structure for table `role_user` */

DROP TABLE IF EXISTS `role_user`;

CREATE TABLE `role_user` (
  `role_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `role_user` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) DEFAULT NULL,
  `email` text COLLATE utf8_unicode_ci,
  `password` text COLLATE utf8_unicode_ci,
  `phone_number` decimal(10,0) DEFAULT NULL,
  `address` text COLLATE utf8_unicode_ci,
  `name` text COLLATE utf8_unicode_ci,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `delete_flg` smallint(6) DEFAULT NULL,
  `hash_key` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `user` */

insert  into `user`(`user_id`,`email`,`password`,`phone_number`,`address`,`name`,`create_date`,`update_date`,`delete_flg`,`hash_key`) values (1,'kakakhang@yahoo.com','123456',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'n','1',NULL,NULL,NULL,NULL,NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
