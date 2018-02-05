<?php
include_once 'conexion_bd.php';

$jsonDias = $_REQUEST['jsonDias'];
$medico = $_REQUEST['medico'];
$arrayDias = json_decode($jsonDias);
echo $arrayDias[0];
