<?php

include_once 'conexion_bd.php';

$medico = $_REQUEST['medico'];


$ordenSQL = "SELECT tramo.tramoInicio AS 'tramoInicio', tramo.tramoFinal AS 'tramoFinal',tramo.id AS 'id' FROM turnos,tramo,medicos, horariosmedicos WHERE turnos.id = tramo.idTurno AND horariosmedicos.idTurno = turnos.id AND horariosmedicos.id = horariosmedicos.idMedico AND medicos.nombre = '".$medico."';";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        array_push($arrayResultado, (object) ['id' => $fila['id'],'tramoInicio' => $fila['tramoInicio'],'tramoFinal' => $fila['tramoFinal']]);
        $fila = $consulta->fetch_array();
    }
}
echo json_encode($arrayResultado);
$conexion->close();
