<?php

include_once 'conexion_bd.php';
$objeto = $_REQUEST['json'];
$datosCliente = json_decode($objeto);
$ordenSQL = "SELECT * FROM usuarios WHERE correo='" . $datosCliente->email . "' AND password='" . $datosCliente->pass . "';";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        $arrayResultado = array('nombre' => $fila['nombre'], 'email' => $fila['correo'], 'nif' => $fila['nif'], 'apellido' => $fila['apellido']);
        $fila = $consulta->fetch_array();
    }
}
if ($arrayResultado != null){
    echo json_decode($arrayResultado);
}else{
    echo false;
}
