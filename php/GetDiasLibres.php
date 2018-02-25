<?php

include_once 'conexion_bd.php';

$medico = $_REQUEST['json'];
$objetoMedico = json_decode($medico);

$ordenSQL = "SELECT * FROM medicos, diaslibres WHERE medicos.id = diaslibres.idMedico AND medicos.nombre ='".$objetoMedico->medico."'";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        array_push($arrayResultado, (object)['diasLibres' => $fila['fechaLibre']]);
        $fila = $consulta->fetch_array();
    }
}
echo json_encode($arrayResultado);
$conexion->close();
