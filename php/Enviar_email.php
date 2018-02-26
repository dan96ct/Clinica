<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$jsonResumen = $_REQUEST['json'];
$jsonResumenConsulta = $_REQUEST['json2'];
$cliente = json_decode($jsonResumen);
$datosConsulta = json_decode($jsonResumenConsulta);

require_once '../phpmailer/src/PHPMailer.php';
require_once '../phpmailer/src/Exception.php';
require_once '../phpmailer/src/SMTP.php';
require_once '../phpmailer/src/OAuth.php';

//Load composer's autoloader

$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'info.virtualproject@gmail.com';                 // SMTP username
    $mail->Password = 'project0102';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to
    $mail->smtpConnect();

    //Recipients
    $mail->setFrom($cliente->email, '');
    $mail->addAddress($cliente->email, 'Clinica');     // Add a recipient
    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'DATOS CLINICA ';
    $mail->Body = '<table style="font-size:20px;">'
            . '<tr><td colspan="2">DATOS DE USUARIO</td></tr>'
            . '<tr><td>Nombre</td><td>' . $cliente->nombre . '</td></tr>'
            . '<tr><td>NIF</td><td>' . $cliente->nif . '</td></tr>'
            . '<tr><td>Apellidos</td><td>' . $cliente->apellido . '</td></tr>'
            . '<tr><td>Email</td><td>' . $cliente->email . '</td></tr>'
            . '<tr><td colspan="2">DATOS DE LA CITA</td></tr>'
            . '<tr><td>Medico</td><td>' . $datosConsulta->medico . '</td></tr>'
            . '<tr><td>Especialidad</td><td>' . $datosConsulta->especialidad . '</td></tr>'
            . '<tr><td>Dia</td><td>' . $datosConsulta->dia . '</td></tr>'
            . '<tr><td>Hora</td><td>' . $datosConsulta->hora . '</td></tr>'
            . '</table>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}