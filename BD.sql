/*
SQLyog Enterprise - MySQL GUI v8.05 
MySQL - 5.7.24 : Database - id_publicidad
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `configuracion` */

DROP TABLE IF EXISTS `configuracion`;

CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `configuracion` */

/*Table structure for table `localidades` */

DROP TABLE IF EXISTS `localidades`;

CREATE TABLE `localidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `localidad` varchar(100) DEFAULT NULL,
  `direccion` text,
  `telefono` varchar(15) DEFAULT NULL,
  `foto` text,
  `representante` varchar(50) DEFAULT NULL,
  `estado` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `localidades` */

insert  into `localidades`(`id`,`localidad`,`direccion`,`telefono`,`foto`,`representante`,`estado`) values (1,'Colmado Pepo','Calle 22 esq lo patos','8098528965',NULL,'Athony Reyes',1),(2,'Tienda EMOS 2','Calle 47 esq Calle 22','8098528968','','Pablo Cazo2',1),(3,'Grupo Ramos','Calle 23','8098527854','','Jorge Perez',1);

/*Table structure for table `login_log` */

DROP TABLE IF EXISTS `login_log`;

CREATE TABLE `login_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

/*Data for the table `login_log` */

insert  into `login_log`(`id`,`id_usuario`,`fecha`,`hora`) values (1,1,'2022-11-06','13:55:17'),(2,1,'2022-11-07','09:15:07'),(3,2,'2022-11-07','13:27:26'),(4,2,'2022-11-07','13:29:41'),(5,2,'2022-11-07','13:31:27'),(6,1,'2022-11-07','13:48:09'),(7,2,'2022-11-07','13:48:29'),(8,2,'2022-11-07','13:49:12'),(9,2,'2022-11-07','13:50:40'),(10,2,'2022-11-07','13:53:05'),(11,2,'2022-11-07','13:55:02'),(12,2,'2022-11-07','15:22:29'),(13,2,'2022-11-07','17:09:57');

/*Table structure for table `lottery` */

DROP TABLE IF EXISTS `lottery`;

CREATE TABLE `lottery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text,
  `date_created` date DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `logo` text,
  `closed_time` datetime DEFAULT NULL,
  `open_time` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `numberOne` int(11) DEFAULT NULL,
  `numberTwo` int(11) DEFAULT NULL,
  `numberThreee` int(11) DEFAULT NULL,
  `dateWinners` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `lottery` */

insert  into `lottery`(`id`,`name`,`date_created`,`status`,`logo`,`closed_time`,`open_time`,`active`,`numberOne`,`numberTwo`,`numberThreee`,`dateWinners`) values (1,'GANA MÁS','2022-11-06',1,'https://peraviavision.tv/wp-content/uploads/2019/01/ganamas.png','2022-10-18 14:30:10','2022-10-18 08:00:10',1,72,94,42,'2022-11-07 00:00:00');

/*Table structure for table `publicidad` */

DROP TABLE IF EXISTS `publicidad`;

CREATE TABLE `publicidad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `foto` text,
  `id_localidad` int(11) DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `estado` int(11) DEFAULT '1',
  `loope` int(11) DEFAULT NULL,
  `usuario_created` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `publicidad` */

insert  into `publicidad`(`id`,`foto`,`id_localidad`,`fecha_creacion`,`fecha_inicio`,`fecha_vencimiento`,`estado`,`loope`,`usuario_created`) values (1,'https://theressa.net/images/articles/5c38f9fd685f5publicitaria-banner.jpg',1,'2022-11-07','2022-11-20','2022-11-25',1,10,1),(4,'https://www.murderpink.com/wp-content/uploads/2019/10/coca-cola-1782095_1280.jpg',10,'2022-11-07','2022-11-28','2022-11-21',2,17,1);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `roles` */

insert  into `roles`(`id`,`rol`) values (1,'Supervisor'),(2,'Administrador');

/*Table structure for table `scrapping_log` */

DROP TABLE IF EXISTS `scrapping_log`;

CREATE TABLE `scrapping_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateRun` date DEFAULT NULL,
  `dateTimeRun` datetime DEFAULT NULL,
  `timeRun` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `scrapping_log` */

insert  into `scrapping_log`(`id`,`dateRun`,`dateTimeRun`,`timeRun`) values (1,'2022-11-06','2022-11-06 14:09:04','14:09:04'),(2,'2022-11-06','2022-11-06 14:11:12','14:11:12'),(3,'2022-11-06','2022-11-06 14:11:55','14:11:55'),(4,'2022-11-07','2022-11-07 15:23:20','15:23:20');

/*Table structure for table `time_test` */

DROP TABLE IF EXISTS `time_test`;

CREATE TABLE `time_test` (
  `timezone` varchar(32) DEFAULT NULL,
  `time_datetime` datetime DEFAULT NULL,
  `time_timestamp` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `time_test` */

insert  into `time_test`(`timezone`,`time_datetime`,`time_timestamp`) values ('SYSTEM','2020-03-12 11:00:00','2020-03-12 11:00:00');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` text,
  `correo` varchar(75) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `estado` int(11) DEFAULT '1',
  `token` text,
  `token_created` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `ultima_conexion` datetime DEFAULT NULL,
  `rol` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`nombre`,`apellido`,`username`,`password`,`correo`,`fecha_creacion`,`estado`,`token`,`token_created`,`status`,`ultima_conexion`,`rol`) values (1,'Feer','Burgos','feer.burgos','$2b$10$6thkOOQszrxCTj8En6xzSOSom.Uyh8nJvYCBNGgGMs0sUCN2HYT5e','feer.romeo@gmail.com','2022-11-06 12:11:52',1,NULL,NULL,1,'2022-11-07 13:48:09',1),(2,'Fernando','Burgos','f.burgos','$2b$10$M7aAoS9e3UF/hcRDEHbxtuI3sJIIzp4yy4Yo44w1XnFgjgG1LUJ4W','fernandohbd10@gmail.com','2022-11-06 12:22:19',1,NULL,NULL,1,'2022-11-07 17:09:57',1),(3,'Hector','Morales','e.morales','$2b$10$/dgy.HNHniFdbwIMWVs1EOOm1dNPSfdfo5KrsmFzNqebfCSNw3H3i','e.morales@gmail.com','2022-11-06 12:22:43',1,NULL,NULL,1,NULL,1),(7,'Michael','Jordan','m.jordan','$2b$10$9WFUkd4rMOHk/sjLophqP.QfAT2iBzQpPZaNexvtgRpGiU2g3O3CC','michael.jordan@gmail.com','2022-11-07 13:12:27',1,NULL,NULL,1,NULL,1);

/*Table structure for table `winners` */

DROP TABLE IF EXISTS `winners`;

CREATE TABLE `winners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idLottery` int(11) DEFAULT NULL,
  `numberOne` int(11) DEFAULT NULL,
  `numberTwo` int(11) DEFAULT NULL,
  `numberThreee` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `name` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

/*Data for the table `winners` */

insert  into `winners`(`id`,`idLottery`,`numberOne`,`numberTwo`,`numberThreee`,`date`,`name`) values (7,9,46,74,66,'2022-11-06','QUINIELA REAL'),(8,21,38,70,65,'2022-11-06','LA PRIMERA DÍA'),(9,23,57,71,24,'2022-11-06','LA SUERTE 12:30'),(10,25,4,94,89,'2022-11-06','QUINIELA LOTEDOM'),(11,27,91,40,88,'2022-11-06','ANGUILA MAÑANA'),(12,28,83,73,87,'2022-11-06','ANGUILA MEDIO DÍA'),(13,1,12,4,90,'2022-11-06','GANA MÁS'),(14,1,72,94,42,'2022-11-07','GANA MÁS'),(15,9,18,59,41,'2022-11-07','QUINIELA REAL'),(16,14,11,43,20,'2022-11-07','FLORIDA DÍA'),(17,19,35,95,5,'2022-11-07','LA PRIMERA DÍA'),(18,21,82,57,6,'2022-11-07','LA SUERTE 12:30'),(19,23,33,55,71,'2022-11-07','QUINIELA LOTEDOM'),(20,25,33,13,87,'2022-11-07','ANGUILA MAÑANA'),(21,26,96,9,84,'2022-11-07','ANGUILA MEDIO DÍA');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
