<?php
include_once 'conexion_bd.php';

$json = $_REQUEST['json'];
$datos = json_decode($json);

$ordenSQL2 = "SELECT * FROM citas WHERE fecha='".$datos->dia."';";
$consulta2 = $conexion->query($ordenSQL2);
$arrayDiasCitasOcupadas = Array();
if ($consulta2) {
    $fila2 = $consulta2->fetch_array();
    while ($fila2) {
        array_push($arrayDiasCitasOcupadas, (object) ['fecha' => $fila2['fecha'], 'horaCita' => $fila2['horaCita']]);
        $fila2 = $consulta2->fetch_array();
    }
}

$ordenSQL = "SELECT tramo.tramoInicio AS 'tramoInicio', tramo.tramoFinal AS 'tramoFinal',tramo.id AS 'id' FROM turnos,tramo,medicos, horariosmedicos WHERE turnos.id = tramo.idTurno AND horariosmedicos.idTurno = turnos.id AND horariosmedicos.id = horariosmedicos.idMedico AND medicos.nombre = '" . $datos->medico . "';";
$consulta = $conexion->query($ordenSQL);
$arrayResultado = Array();
if ($consulta) {
    $fila = $consulta->fetch_array();
    while ($fila) {
        $validar = true;
        for ($i = 0; $i < count($arrayDiasCitasOcupadas); $i++) {
            if ($arrayDiasCitasOcupadas[$i]->horaCita == $fila['tramoInicio']) {
                $validar = false;
                break;
            }
        }
        if ($validar == true) {
            array_push($arrayResultado, (object) ['id' => $fila['id'], 'tramoInicio' => $fila['tramoInicio'], 'tramoFinal' => $fila['tramoFinal']]);
        }
        $fila = $consulta->fetch_array();
    }
}
echo json_encode($arrayResultado);
$conexion->close();
