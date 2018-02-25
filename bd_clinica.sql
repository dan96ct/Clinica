CREATE DATABASE  IF NOT EXISTS `bd_clinica` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `bd_clinica`;
-- MySQL dump 10.16  Distrib 10.1.28-MariaDB, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: bd_clinica
-- ------------------------------------------------------
-- Server version	10.1.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bajacitas`
--

DROP TABLE IF EXISTS `bajacitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bajacitas` (
  `id` int(11) NOT NULL,
  `usuario` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `medico` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `fechCita` datetime NOT NULL,
  `hora` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bajacitas`
--

LOCK TABLES `bajacitas` WRITE;
/*!40000 ALTER TABLE `bajacitas` DISABLE KEYS */;
INSERT INTO `bajacitas` VALUES (0,'Daniel','Juan Ramon','2018-03-09 00:00:00','15:00:00');
/*!40000 ALTER TABLE `bajacitas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `citas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idMedico` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `horaCita` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario_idx` (`idUsuario`),
  KEY `id_medico_idx` (`idMedico`),
  CONSTRAINT `id_medico` FOREIGN KEY (`idMedico`) REFERENCES `medicos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clinica`
--

DROP TABLE IF EXISTS `clinica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clinica` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clinica`
--

LOCK TABLES `clinica` WRITE;
/*!40000 ALTER TABLE `clinica` DISABLE KEYS */;
INSERT INTO `clinica` VALUES (1,'Garcia','967483265','garcia@clinica.com','C/Buenos aires N18');
/*!40000 ALTER TABLE `clinica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diaslibres`
--

DROP TABLE IF EXISTS `diaslibres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diaslibres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idMedico` int(11) NOT NULL,
  `fechaLibre` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fechaLibre_UNIQUE` (`fechaLibre`,`idMedico`),
  KEY `id_medico_dialibre_idx` (`idMedico`),
  CONSTRAINT `id_medico_dialibre` FOREIGN KEY (`idMedico`) REFERENCES `medicos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diaslibres`
--

LOCK TABLES `diaslibres` WRITE;
/*!40000 ALTER TABLE `diaslibres` DISABLE KEYS */;
/*!40000 ALTER TABLE `diaslibres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidades`
--

DROP TABLE IF EXISTS `especialidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `especialidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidades`
--

LOCK TABLES `especialidades` WRITE;
/*!40000 ALTER TABLE `especialidades` DISABLE KEYS */;
INSERT INTO `especialidades` VALUES (1,'Cirujanos'),(3,'Acupuntores'),(4,'Oftalmología'),(5,'Traumatología');
/*!40000 ALTER TABLE `especialidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horariosmedicos`
--

DROP TABLE IF EXISTS `horariosmedicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `horariosmedicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idMedico` int(11) NOT NULL,
  `idTurno` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idMedico_horarios_idx` (`idMedico`),
  KEY `idTurno_horarios_idx` (`idTurno`),
  CONSTRAINT `idMedico_horarios` FOREIGN KEY (`idMedico`) REFERENCES `medicos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idTurno_horarios` FOREIGN KEY (`idTurno`) REFERENCES `turnos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horariosmedicos`
--

LOCK TABLES `horariosmedicos` WRITE;
/*!40000 ALTER TABLE `horariosmedicos` DISABLE KEYS */;
INSERT INTO `horariosmedicos` VALUES (16,5,1),(17,5,2),(18,5,19),(19,6,11),(20,6,12),(21,6,21),(22,7,16),(23,7,16),(24,7,8),(25,8,21),(26,8,22),(27,8,9),(28,9,3),(29,9,4),(30,9,14),(31,9,16),(32,10,11),(33,10,12),(34,10,17),(35,11,18),(36,11,23),(37,11,24),(38,12,6),(39,12,7),(40,12,13);
/*!40000 ALTER TABLE `horariosmedicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicos`
--

DROP TABLE IF EXISTS `medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `especialidad` int(11) NOT NULL,
  `correo` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `nif` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_especialidad_idx` (`especialidad`),
  CONSTRAINT `id_especialidad` FOREIGN KEY (`especialidad`) REFERENCES `especialidades` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicos`
--

LOCK TABLES `medicos` WRITE;
/*!40000 ALTER TABLE `medicos` DISABLE KEYS */;
INSERT INTO `medicos` VALUES (5,'Juan Ramon',1,'J.ramon@gmail.com','C/Iniesta N 10','13230732M'),(6,'Daniel Fernandez',1,'D.fernandez@gmail.com','C/Base N2','75120824H'),(7,'Cristina Garcia',3,'C.garcia@gmail.com','C/Albacete n9','90461510A'),(8,'Luis Avila',3,'L.avila@gmail.com','C/Cenizate N8','27391969G'),(9,'Aaron Faconin',4,'A.falconin@gmail.com','C/Italia n6','31677121A'),(10,'Alberto Fuentes',4,'A.fuentes@gmail.com','C/Londres n9','63385334W'),(11,'Soraya Flores',5,'S.flores@gmail.com','C/Madrid','89890780H'),(12,'Ines Ortiz',5,'I.ortiez@gmail.com','C/Almansa','13056613L');
/*!40000 ALTER TABLE `medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tramo`
--

DROP TABLE IF EXISTS `tramo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tramo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idTurno` int(11) NOT NULL,
  `tramoInicio` time NOT NULL,
  `tramoFinal` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_turno_idx` (`idTurno`),
  CONSTRAINT `id_turno` FOREIGN KEY (`idTurno`) REFERENCES `turnos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tramo`
--

LOCK TABLES `tramo` WRITE;
/*!40000 ALTER TABLE `tramo` DISABLE KEYS */;
INSERT INTO `tramo` VALUES (6,1,'09:00:00','09:30:00'),(7,1,'09:30:00','10:00:00'),(8,1,'10:00:00','10:30:00'),(9,1,'10:30:00','11:00:00'),(10,1,'11:00:00','11:30:00'),(11,1,'11:30:00','12:00:00'),(12,1,'12:00:00','12:30:00'),(13,2,'12:30:00','13:00:00'),(14,2,'13:30:00','14:00:00'),(15,2,'14:00:00','14:30:00'),(16,2,'14:30:00','15:00:00'),(17,3,'15:00:00','15:30:00'),(18,3,'15:30:00','16:00:00'),(19,3,'16:00:00','16:30:00'),(20,3,'16:30:00','18:00:00'),(21,4,'18:00:00','18:30:00'),(38,4,'18:30:00','19:00:00'),(39,4,'19:00:00','19:30:00'),(40,4,'19:30:00','20:00:00'),(41,4,'20:00:00','20:30:00'),(42,4,'20:30:00','21:00:00'),(43,4,'21:00:00','21:30:00'),(44,4,'21:30:00','22:00:00'),(45,6,'09:00:00','09:30:00'),(46,6,'09:30:00','10:00:00'),(47,6,'10:00:00','10:30:00'),(48,6,'10:30:00','11:00:00'),(49,6,'11:00:00','11:30:00'),(50,6,'11:30:00','12:00:00'),(51,6,'12:00:00','12:30:00'),(52,7,'12:30:00','13:00:00'),(53,7,'13:00:00','13:30:00'),(54,7,'13:30:00','14:00:00'),(55,7,'14:00:00','14:30:00'),(56,7,'14:30:00','15:00:00'),(57,8,'15:00:00','15:30:00'),(58,8,'15:30:00','16:00:00'),(59,8,'16:00:00','16:30:00'),(60,8,'16:30:00','17:00:00'),(61,8,'17:00:00','17:30:00'),(62,8,'17:30:00','18:00:00'),(63,9,'18:00:00','18:30:00'),(64,9,'18:30:00','19:00:00'),(65,9,'19:00:00','19:30:00'),(66,9,'19:30:00','20:00:00'),(67,9,'20:00:00','20:30:00'),(68,9,'20:30:00','21:00:00'),(69,9,'21:00:00','21:30:00'),(70,9,'21:30:00','22:00:00'),(71,11,'09:00:00','09:30:00'),(72,11,'09:30:00','10:00:00'),(73,11,'10:00:00','10:30:00'),(74,11,'10:30:00','11:00:00'),(75,11,'11:00:00','11:30:00'),(76,11,'11:30:00','12:00:00'),(77,11,'12:00:00','12:30:00'),(92,12,'12:30:00','13:00:00'),(93,12,'13:00:00','13:30:00'),(94,12,'13:30:00','14:00:00'),(95,12,'14:00:00','14:30:00'),(96,12,'14:30:00','15:00:00'),(97,13,'15:00:00','15:30:00'),(98,13,'15:30:00','16:00:00'),(99,13,'16:00:00','16:30:00'),(100,13,'16:30:00','17:00:00'),(101,13,'17:00:00','17:30:00'),(102,13,'17:30:00','18:00:00'),(103,14,'18:00:00','18:30:00'),(104,14,'18:30:00','19:00:00'),(105,14,'19:00:00','19:30:00'),(106,14,'19:30:00','20:00:00'),(107,14,'20:00:00','20:30:00'),(108,14,'20:30:00','21:00:00'),(109,14,'21:00:00','21:30:00'),(110,14,'21:30:00','22:00:00'),(111,16,'09:00:00','09:30:00'),(112,16,'09:30:00','10:00:00'),(113,16,'10:00:00','10:30:00'),(114,16,'10:30:00','11:00:00'),(115,16,'11:00:00','11:30:00'),(116,16,'11:30:00','12:00:00'),(117,16,'12:00:00','12:30:00'),(118,17,'12:30:00','13:00:00'),(119,17,'13:00:00','13:30:00'),(120,17,'13:30:00','14:00:00'),(121,17,'14:00:00','14:30:00'),(122,17,'14:30:00','15:00:00'),(123,18,'15:00:00','15:30:00'),(124,18,'15:30:00','16:00:00'),(125,18,'16:00:00','16:30:00'),(126,18,'16:30:00','17:00:00'),(127,18,'17:00:00','17:30:00'),(128,18,'17:30:00','18:00:00'),(129,19,'18:00:00','18:30:00'),(130,19,'18:30:00','19:00:00'),(131,19,'19:00:00','19:30:00'),(132,19,'19:30:00','20:00:00'),(133,19,'20:00:00','20:30:00'),(134,19,'20:30:00','21:00:00'),(135,19,'21:00:00','21:30:00'),(136,19,'21:30:00','22:00:00'),(137,21,'09:00:00','09:30:00'),(138,21,'09:30:00','10:00:00'),(139,21,'10:00:00','10:30:00'),(140,21,'10:30:00','11:00:00'),(141,21,'11:00:00','11:30:00'),(142,21,'11:30:00','12:00:00'),(143,21,'12:00:00','12:30:00'),(144,22,'12:30:00','13:00:00'),(145,22,'13:00:00','13:30:00'),(146,22,'13:30:00','14:00:00'),(147,22,'14:00:00','14:30:00'),(148,22,'14:30:00','15:00:00'),(149,23,'15:00:00','15:30:00'),(150,23,'15:30:00','16:00:00'),(151,23,'16:30:00','16:30:00'),(152,23,'16:30:00','17:00:00'),(153,23,'17:00:00','17:30:00'),(154,23,'17:30:00','18:00:00'),(155,24,'18:00:00','18:30:00'),(156,24,'18:30:00','19:00:00'),(157,24,'19:00:00','19:30:00'),(158,24,'19:30:00','20:00:00'),(159,24,'20:00:00','20:30:00'),(160,24,'20:30:00','21:00:00'),(161,24,'21:00:00','21:30:00'),(162,24,'21:30:00','22:00:00');
/*!40000 ALTER TABLE `tramo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnos`
--

DROP TABLE IF EXISTS `turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turnos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `horaInicio` time NOT NULL,
  `horaFinal` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnos`
--

LOCK TABLES `turnos` WRITE;
/*!40000 ALTER TABLE `turnos` DISABLE KEYS */;
INSERT INTO `turnos` VALUES (1,'Lunes','09:00:00','12:30:00'),(2,'Lunes','12:30:00','15:00:00'),(3,'Lunes','15:00:00','18:00:00'),(4,'Lunes','18:00:00','22:00:00'),(6,'Martes','09:00:00','12:30:00'),(7,'Martes','12:30:00','15:00:00'),(8,'Martes','15:00:00','18:00:00'),(9,'Martes','18:00:00','22:00:00'),(11,'Miercoles','09:00:00','12:30:00'),(12,'Miercoles','12:30:00','15:00:00'),(13,'Miercoles','15:00:00','18:00:00'),(14,'Miercoles','18:00:00','22:00:00'),(16,'Jueves','09:00:00','12:30:00'),(17,'Jueves ','12:30:00','15:00:00'),(18,'Jueves','15:00:00','18:00:00'),(19,'Jueves ','18:00:00','22:00:00'),(21,'Viernes','09:00:00','12:30:00'),(22,'Viernes','12:30:00','15:00:00'),(23,'Viernes','15:00:00','18:00:00'),(24,'Viernes','18:00:00','22:00:00');
/*!40000 ALTER TABLE `turnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `correo` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `nif` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `apellido` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','Admin@gmail.com','13230732M','1234','');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bd_clinica'
--

--
-- Dumping routines for database 'bd_clinica'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-25 20:31:30
