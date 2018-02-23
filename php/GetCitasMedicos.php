<?php


include_once 'conexion_bd.php';
$objeto = $_REQUEST['json'];
$datos = json_decode($objeto);
$ordenSQL = "SELECT medicos.nombre AS 'nombreMedico', citas.fecha AS 'fecha', citas.horaCita AS 'hora', citas.id AS 'id', usuarios.nombre AS 'nombreUsuario' FROM citas, usuarios, medicos WHERE citas.idUsuario = usuarios.id AND citas.idMedico = medicos.id AND medicos.nombre = '".$datos->medico."'";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        array_push($arrayResultado, (Object) ['nombreMedico' => $fila['nombreMedico'],'fecha' => $fila['fecha'],'hora' => $fila['hora'], 'id' => $fila['id'], 'nombreUsuario'=> $fila['nombreUsuario']]);
        $fila = $consulta->fetch_array();
    }
}
if ($arrayResultado != null){
    echo json_encode($arrayResultado);
}else{
    echo false;
}