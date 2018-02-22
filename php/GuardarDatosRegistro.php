<?php

include_once 'conexion_bd.php';

$jsonResumen = $_REQUEST['json'];
$jsonResumenConsulta = $_REQUEST['json2'];
$jsonObjecto = json_decode($jsonResumen);
$jsonObjeto2 = json_decode($jsonResumenConsulta);

$ordenSQL = "INSERT INTO usuarios (`nombre`, `correo`,`nif`,`password`,`apellido`) VALUES ('" . $jsonObjecto->nombre . "','" . $jsonObjecto->email . "','" . $jsonObjecto->nif . "','" . $jsonObjecto->pass . "','" . $jsonObjecto->apellido . "');";
$resultado = $conexion->query($ordenSQL);
if ($resultado) {
    $ordenSQL2 = "SELECT id FROM usuarios WHERE nif = '" . $jsonObjecto->nif . "';";
    $resultado2 = $conexion->query($ordenSQL2);

    $idUsuario = "";
    if ($resultado2) {
        $fila = $resultado2->fetch_array();
        $idUsuario = $fila['id'];
    }

    $ordenSQL3 = "SELECT id FROM medicos WHERE nombre = '" . $jsonObjeto2->medico . "';";
    $resultado3 = $conexion->query($ordenSQL3);

    $idMedico = "";
    if ($resultado3) {
        $fila = $resultado3->fetch_array();
        $idMedico = $fila['id'];
    }

    $ordenSQ4 = "INSERT INTO citas (`idUsuario`, `idMedico`,`fecha`,`horaCita`) VALUES ('" . $idUsuario . "','" . $idMedico . "','" . $jsonObjeto2->dia . "','" . $jsonObjeto2->hora . "');";
    $resultado4 = $conexion->query($ordenSQ4);


    echo $idMedico;
}else{
    echo false;
}