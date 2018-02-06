<?php

include_once 'conexion_bd.php';

$jsonDias = $_REQUEST['jsonDias'];
$medico = $_REQUEST['medico'];
$arrayDias = json_decode($jsonDias);

$ordenSQL = "SELECT * FROM medicos WHERE nombre='".$medico."'";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
$idMedico = "";
if ($consulta) {
    $fila = $consulta->fetch_array();
    $idMedico = $fila['id'];
}

mysqli_autocommit($conexion, false);
for ($index = 0; $index < count($arrayDias); $index++) {
    $ordenSQL2 = "INSERT INTO diaslibres (`idMedico`, `fechaLibre`) VALUES ('" . $idMedico . "', '" . $arrayDias[$index] . "')";
    $resultado = $conexion->query($ordenSQL2);
    if ($resultado) {
        mysqli_commit($conexion);
    }else{
        mysqli_rollback($conexion);
        echo 'Ha surgido un error al insertar los datos';
        break;
    }
}
 
echo $idMedico;
