<?php

include_once 'conexion_bd.php';


$ordenSQL = "SELECT * FROM medicos";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        array_push($arrayResultado, (object)['nombre' => $fila['nombre']]);
        $fila = $consulta->fetch_array();
    }
}
echo json_encode($arrayResultado);
$conexion->close();