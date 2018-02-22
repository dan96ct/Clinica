<?php

include_once 'conexion_bd.php';
$objeto = $_REQUEST['json'];
$datosCliente = json_decode($objeto);
$ordenSQL = "SELECT medicos.nombre AS 'nombreMedico', citas.fecha AS 'fecha', citas.horaCita AS 'hora' FROM citas, usuarios, medicos WHERE citas.idUsuario = usuarios.id AND citas.idMedico = medicos.id AND usuarios.correo = '".$datosCliente->email."' AND usuarios.password ='".$datosCliente->pass."'";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        array_push($arrayResultado, (Object) ['nombreMedico' => $fila['nombreMedico'],'fecha' => $fila['fecha'],'hora' => $fila['hora'], ]);
        $fila = $consulta->fetch_array();
    }
}
if ($arrayResultado != null){
    echo json_decode($arrayResultado);
}else{
    echo false;
}