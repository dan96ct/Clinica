<?php

include_once 'conexion_bd.php';

$objeto = $_REQUEST['json'];
$datosCliente = json_decode($objeto);
$ordenSQL = "SELECT medicos.nombre AS 'nombreMedico', citas.fecha AS 'fecha', citas.horaCita AS 'hora', usuarios.nombre AS 'usuario', citas.id AS 'id' FROM citas, usuarios, medicos WHERE citas.idUsuario = usuarios.id AND citas.idMedico = medicos.id AND citas.id='" . $datosCliente->id . "'";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        array_push($arrayResultado, (Object) ['nombreMedico' => $fila['nombreMedico'], 'fecha' => $fila['fecha'], 'hora' => $fila['hora'], 'usuario' => $fila['usuario'], 'id' => $fila['id']]);
        $fila = $consulta->fetch_array();
    }
}

$ordenSQL2 = "INSERT INTO bajacitas (`usuario`, `medico`, `fechCita`, `hora`) VALUES ('" . $arrayResultado[0]->usuario . "', '" . $arrayResultado[0]->nombreMedico . "', '" . $arrayResultado[0]->fecha . "', '" . $arrayResultado[0]->hora . "');";
$consulta2 = $conexion->query($ordenSQL2);

$ordenSQL3 = "DELETE FROM citas WHERE id='" . $arrayResultado[0]->id . "';";
$consulta3 = $conexion->query($ordenSQL3);

echo $arrayResultado[0]->fecha;
