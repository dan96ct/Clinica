<?php

$conexion = new mysqli('127.0.0.1', 'root', 'root');


$conexion->set_charset("utf8");
// para evitar que se interpreten mal las tildes y ñ.
if (!$conexion->connect_errno) {
    $conexion->select_db("bd_clinica") or die("Base de Datos no encontrada");
} else {
    echo "<h2> No ha sido posible crear la conexión con el servidor</h2><br>";
} 

