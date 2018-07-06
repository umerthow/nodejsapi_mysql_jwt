/*
SQLyog Ultimate v11.33 (64 bit)
MySQL - 10.1.31-MariaDB : Database - nodejs
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nodejs` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `nodejs`;

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `address` text,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Data for the table `customer` */

insert  into `customer`(`id`,`name`,`address`,`email`,`phone`,`created_at`,`updated_at`) values (5,'Bank Permata','Jl. Nanas No.1 Rancah Wetan RT 001/RW 011','admin@admin.com','admin@admin.com','2018-06-26 11:40:05','0000-00-00 00:00:00'),(6,'Bank Jateng','Grand Vilamas Cinere Blok F7','didik@warsito.com','didik@warsito.com','2018-06-26 11:40:21','0000-00-00 00:00:00'),(7,'Bank Jabar Merauke','Grand Vilamas Cinere Blok F7 DEPOK','ahmad.umar@kompas.com','ahmad.umar@kompas.co','2018-07-06 10:45:16','0000-00-00 00:00:00'),(8,'Kedasi Space','Jl Tanjung Duren no 123','kedasi@space.com','kedasi@space.com','2018-07-06 10:50:06','0000-00-00 00:00:00');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(20) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`username`,`password`,`email`,`created_date`,`updated_date`) values (1,NULL,'ahmadumar','$2a$10$aZHxh5CiSweFKcP9WsG5S.JkPsOIL9DNDiyOV3xSvOJvT.BazDK4y','','2018-06-28 12:11:58','0000-00-00 00:00:00'),(2,NULL,'admin','$2a$10$sHFUSbUULYHXRrQEUiczaeqxCdO0QRJZDczLXf4uaPo.8gLLhgVRa','','2018-06-28 12:20:38','0000-00-00 00:00:00'),(18,NULL,'poepe','$2b$10$tZ8ANTTdwI7IQq/E3Wv1FuYTUUtFut861Ouy/VbNtSdt0oiZUO/Sm','example@email.com','2018-06-29 15:02:24','0000-00-00 00:00:00'),(19,NULL,'demo','$2a$10$EnL.7Lkh5D8h8No/UiT.eOas3z2GYmkL1ZIk7ROG4/BY65gheSBsC','','2018-06-29 21:38:37','0000-00-00 00:00:00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
