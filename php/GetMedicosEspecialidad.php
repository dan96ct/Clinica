<?php

include_once 'conexion_bd.php';

$especialidad = $_REQUEST['json'];
$objetoEsp = json_decode($especialidad);


$ordenSQL = "SELECT medicos.nombre'nombreMedicos' FROM medicos,especialidades WHERE  medicos.especialidad = especialidades.id AND especialidades.nombre ='".$objetoEsp->especialidad. "';";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        array_push($arrayResultado, (object) ['nombre' => $fila['nombreMedicos']]);
        $fila = $consulta->fetch_array();
    }
}
echo json_encode($arrayResultado);
$conexion->close();

