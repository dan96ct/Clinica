<?php

include_once 'conexion_bd.php';

$medico = $_REQUEST['medico'];

$ordenSQL = "SELECT * FROM medicos,horariosmedicos, turnos WHERE medicos.id = horariosmedicos.idMedico AND turnos.id = horariosmedicos.idTurno AND medicos.nombre =".$medico;
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        array_push($arrayResultado, (object)['nombre' => $fila['nombre'], 'dia' => $fila['dia'],'horaInicio' => $fila['horaInicio'],'horaFinal' => $fila['horaFinal']]);
        $fila = $consulta->fetch_array();
    }
}
echo json_encode($arrayResultado);
$conexion->close();
