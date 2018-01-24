CREATE DATABASE  IF NOT EXISTS `bd_clinica` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `bd_clinica`;
-- MySQL dump 10.13  Distrib 5.7.20, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: bd_clinica
-- ------------------------------------------------------
-- Server version	5.7.20

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
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
  KEY `id_medico_dialibre_idx` (`idMedico`),
  CONSTRAINT `id_medico_dialibre` FOREIGN KEY (`idMedico`) REFERENCES `medicos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidades`
--

LOCK TABLES `especialidades` WRITE;
/*!40000 ALTER TABLE `especialidades` DISABLE KEYS */;
INSERT INTO `especialidades` VALUES (1,'Cirujanos'),(2,'Anatomopatólogos'),(3,'Acupuntores'),(4,'Ginecólogos y Obstetras'),(5,'Endocrinos'),(6,'Digestivos'),(7,'Neurólogos'),(8,'Nefrólogos'),(9,'Medicina interna'),(10,'Oncólogos'),(11,'Pediatras'),(12,'Otorrinos'),(13,'Traumatólogos'),(14,'Tratamiento del dolor'),(15,'Radioterapia');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horariosmedicos`
--

LOCK TABLES `horariosmedicos` WRITE;
/*!40000 ALTER TABLE `horariosmedicos` DISABLE KEYS */;
INSERT INTO `horariosmedicos` VALUES (4,5,2),(5,5,3),(6,5,4),(7,6,10),(8,6,11),(9,6,15),(10,7,12),(11,7,13),(12,7,14);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicos`
--

LOCK TABLES `medicos` WRITE;
/*!40000 ALTER TABLE `medicos` DISABLE KEYS */;
INSERT INTO `medicos` VALUES (5,'Juan Ramon',1,'J.ramon@gmail.com','C/Iniesta N 10','13230732M'),(6,'Daniel Fernandez',3,'D.fernandez@gmail.com','C/Base N2','75120824H'),(7,'Cristina Garcia',5,'C.garcia@gmail.com','C/Albacete n9','90461510A'),(8,'Alberto Cebrian',4,'A.cebrian@gmail.com','C/Alicante n10','33167959G'),(9,'Maria Del Carmen Tarancon',4,'M.carmen@gmail.com','C/Barcelona n20','30610886W');
/*!40000 ALTER TABLE `medicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tramo`
--

DROP TABLE IF EXISTS `tramo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tramo` (
  `id` int(11) NOT NULL,
  `idTurno` int(11) DEFAULT NULL,
  `tramo` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_turno_idx` (`idTurno`),
  CONSTRAINT `id_turno` FOREIGN KEY (`idTurno`) REFERENCES `turnos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tramo`
--

LOCK TABLES `tramo` WRITE;
/*!40000 ALTER TABLE `tramo` DISABLE KEYS */;
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
INSERT INTO `turnos` VALUES (1,'Lunes','09:00:00','12:30:00'),(2,'Lunes','12:30:00','15:00:00'),(3,'Lunes','15:00:00','18:00:00'),(4,'Lunes','18:00:00','22:00:00'),(5,'Lunes','22:00:00','09:00:00'),(6,'Martes','09:00:00','12:30:00'),(7,'Martes','12:30:00','15:00:00'),(8,'Martes','15:00:00','18:00:00'),(9,'Martes','18:00:00','22:00:00'),(10,'Martes','22:00:00','09:00:00'),(11,'Miercoles','09:00:00','12:30:00'),(12,'Miercoles','12:30:00','15:00:00'),(13,'Miercoles','15:00:00','18:00:00'),(14,'Miercoles','18:00:00','22:00:00'),(15,'Miercoles','22:00:00','09:00:00'),(16,'Jueves','09:00:00','12:30:00'),(17,'Jueves ','12:30:00','15:00:00'),(18,'Jueves','15:00:00','18:00:00'),(19,'Jueves ','18:00:00','22:00:00'),(20,'Jueves','22:00:00','09:00:00'),(21,'Viernes','09:00:00','12:30:00'),(22,'Viernes','12:30:00','15:00:00'),(23,'Viernes','15:00:00','18:00:00'),(24,'Viernes','18:00:00','22:00:00'),(25,'Viernes','22:00:00','09:00:00');
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
  `direccion` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `telefono` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `nif` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
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

-- Dump completed on 2018-01-24 13:01:20
