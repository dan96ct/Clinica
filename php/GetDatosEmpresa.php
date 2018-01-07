<?php
include_once 'conexion_bd.php';


$ordenSQL = "SELECT * FROM clinica;";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        $arrayResultado = array('nombre' => $fila['nombre'], 'telefono' => $fila['telefono'], 'correo' => $fila['correo'], 'direccion' => $fila['direccion']);
        $fila = $consulta->fetch_array();
    }
}
echo json_encode($arrayResultado);
$conexion->close();
