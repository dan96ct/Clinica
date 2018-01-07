<?php
include_once 'conexion_bd.php';


$ordenSQL = "SELECT * FROM especialidades;";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        $arrayResultado[] = $fila['nombre'];
        $fila = $consulta->fetch_array();
    }
}
echo json_encode($arrayResultado);
$conexion->close();