<?php

include_once 'conexion_bd.php';

$usuario = $_REQUEST['usuario'];
$pass = $_REQUEST['pass'];

$ordenSQL = "SELECT * FROM usuarios WHERE correo =".$usuario." AND password=".$pass;
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
$respuesta = "";
if ($consulta) {
    $fila = $consulta->fetch_array();
    $respuesta = $fila['nombre'];
}
echo json_encode($respuesta);
$conexion->close();
