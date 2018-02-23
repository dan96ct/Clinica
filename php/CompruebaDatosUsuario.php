<?php

include_once 'conexion_bd.php';

$jsonUsuario = $_REQUEST['json'];
$datosUsuario = json_decode($jsonUsuario);
$ordenSQL = "SELECT * FROM usuarios WHERE correo ='" . $datosUsuario->usuario . "' AND password='" . $datosUsuario->pass . "'";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
$respuesta = "";
if ($consulta) {
    $fila = $consulta->fetch_array();
    $respuesta = $fila['nombre'];
    echo json_encode($respuesta);
}else{
    echo false;
}
$conexion->close();
