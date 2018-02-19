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
-- Table structure for table `agenda`
--

DROP TABLE IF EXISTS `agenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agenda` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idMedico` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `tramoHora` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `idCita` int(11) NOT NULL,
  `laboral` enum('SI','NO') COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCita_agenda_idx` (`idCita`),
  KEY `idMedico_agenda_idx` (`idMedico`),
  CONSTRAINT `idCita_agenda` FOREIGN KEY (`idCita`) REFERENCES `citas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idMedico_agenda` FOREIGN KEY (`idMedico`) REFERENCES `medicos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda`
--

LOCK TABLES `agenda` WRITE;
/*!40000 ALTER TABLE `agenda` DISABLE KEYS */;
/*!40000 ALTER TABLE `agenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bajacitas`
--

DROP TABLE IF EXISTS `bajacitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bajacitas` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idMedico` int(11) NOT NULL,
  `fechCita` datetime NOT NULL,
  `hora` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_medico_cita_idx` (`idMedico`),
  KEY `id_usuario_citaBaja_idx` (`idUsuario`),
  CONSTRAINT `id_medico_citaBaja` FOREIGN KEY (`idMedico`) REFERENCES `medicos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_usuario_citaBaja` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bajacitas`
--

LOCK TABLES `bajacitas` WRITE;
/*!40000 ALTER TABLE `bajacitas` DISABLE KEYS */;
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
  UNIQUE KEY `fechaLibre_UNIQUE` (`fechaLibre`,`idMedico`),
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidades`
--

LOCK TABLES `especialidades` WRITE;
/*!40000 ALTER TABLE `especialidades` DISABLE KEYS */;
INSERT INTO `especialidades` VALUES (1,'Cirujanos'),(3,'Acupuntores');
/*!40000 ALTER TABLE `especialidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios`
--

DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `horarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idMedico` int(11) NOT NULL,
  `dia` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `horaInicioHorario` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `horaFinalHorario` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_medico_idx` (`idMedico`),
  KEY `id_medico_horario_idx` (`idMedico`),
  CONSTRAINT `id_medico_horario` FOREIGN KEY (`idMedico`) REFERENCES `medicos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios`
--

LOCK TABLES `horarios` WRITE;
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horariosmedicos`
--

LOCK TABLES `horariosmedicos` WRITE;
/*!40000 ALTER TABLE `horariosmedicos` DISABLE KEYS */;
INSERT INTO `horariosmedicos` VALUES (4,5,2),(5,5,3),(6,5,4),(7,6,11),(8,6,11),(9,6,16),(10,7,12),(11,7,13),(12,7,14),(13,5,17),(14,5,21),(15,5,18);
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicos`
--

LOCK TABLES `medicos` WRITE;
/*!40000 ALTER TABLE `medicos` DISABLE KEYS */;
INSERT INTO `medicos` VALUES (5,'Juan Ramon',1,'J.ramon@gmail.com','C/Iniesta N 10','13230732M'),(6,'Daniel Fernandez',3,'D.fernandez@gmail.com','C/Base N2','75120824H'),(7,'Cristina Garcia',3,'C.garcia@gmail.com','C/Albacete n9','90461510A');
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tramo`
--

LOCK TABLES `tramo` WRITE;
/*!40000 ALTER TABLE `tramo` DISABLE KEYS */;
INSERT INTO `tramo` VALUES (6,1,'09:00:00','09:30:00'),(7,1,'09:30:00','10:00:00'),(8,1,'10:00:00','10:30:00'),(9,1,'10:30:00','11:00:00'),(10,1,'11:00:00','11:30:00'),(11,1,'11:30:00','12:00:00'),(12,1,'12:00:00','12:30:00'),(13,2,'12:30:00','13:00:00'),(14,2,'13:30:00','14:00:00'),(15,2,'14:00:00','14:30:00'),(16,2,'14:30:00','15:00:00'),(17,3,'15:00:00','15:30:00'),(18,3,'15:30:00','16:00:00'),(19,3,'16:00:00','16:30:00'),(20,3,'16:30:00','18:00:00'),(21,4,'18:00:00','18:30:00'),(38,4,'18:30:00','19:00:00'),(39,4,'19:00:00','19:30:00'),(40,4,'19:30:00','20:00:00'),(41,4,'20:00:00','20:30:00'),(42,4,'20:30:00','21:00:00'),(43,4,'21:00:00','21:30:00'),(44,4,'21:30:00','22:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','Admin@gmail.com','C/Iniesta N 10','654347213','13230732M','1234');
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

-- Dump completed on 2018-02-19 23:41:34
