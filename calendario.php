<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

        <!-- jQuery library -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

        <!-- Latest compiled JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link href="css/css.css" rel="stylesheet" type="text/css"/>
        <title>TODO supply a title</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href='Calendario/fullcalendar.min.css' rel='stylesheet' />
        <link href='Calendario/fullcalendar.print.min.css' rel='stylesheet' media='print' />
        <script src='Calendario/lib/moment.min.js'></script>
        <script src='Calendario/lib/jquery.min.js'></script>
        <script src='Calendario/fullcalendar.min.js'></script>
        <script src="JavaScript/JavaScript_Calendario.js" type="text/javascript"></script>

        <script>

            $(document).ready(function () {

                $('#calendar').fullCalendar({
                    defaultDate: '2018-01-12',
                    editable: true,
                    eventLimit: true, // allow "more" link when too many events
                    dayClick: function (date, jsEvent, view) {
                        añadirDia(date);
                        // change the day's background color just for fun
                        $(this).css('background-color', 'red');
                    }

                });

            });

        </script>
        <style>

            body {
                margin: 40px 10px;
                padding: 0;
                font-family: "Lucida Grande",Helvetica,Arial,Verdana,sans-serif;
                font-size: 14px;
            }

            #calendar {
                max-width: 900px;
                margin: 0 auto;
            }

        </style>
        <?php $nombreMedico = $_REQUEST['medico']; ?>
    </head>
    <body onload="crearArrayDias()">
        <h2 id="titulo"></h2>
        <h3 id="titulo">Por favor seleccione los dias libres</h3>
        <div id="calendar">
        </div>
        <script> introducirNombreMedico(<?php echo $nombreMedico ?>);</script> 

    </body>
</html>
