/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var arrayDias;
var nombreMedico;
var arrayDiasLibres;
var arrayDiasLaborables;
function crearArrayDias() {
    arrayDias = [];
}
function añadirDia(dia) {

    arrayDias.push(dia);
}
function mostrarArray() {
    alert(arrayDias);
}
function cargarMedicos() {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetMedicos.php");
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            mostrarMedicos();
        }
    }
}
function cargarDiasMedico(medico) {
    arrayDias = []; //Reseteamos el array de dias para que no se mezclen con otro medico
    arrayDiasLaborables = [];
    arrayDiasLibres = [];
    var objeto = {'medico': medico};
    var json = JSON.stringify(objeto);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetDatosMedicos.php?json=" + json);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            mostrarDiasCalendario(pasar_a_numero);
        }
    }
}
function mostrarDiasCalendario() {
    var datos = objetoAjax.responseText;
    var objeto = JSON.parse(datos);
    arrayDiasLaborables = objeto;
    $('#calendar').fullCalendar('destroy');
    var miDia = new Date();
    var objeto = {'medico': objeto[0].nombre};
    var json = JSON.stringify(objeto);

    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetDiasLibres.php?json=" + json);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            var datos = objetoAjax.responseText;
            var objeto = JSON.parse(datos);

            if (objeto !== null) {
                arrayDiasLibres = objeto;
            } else {
                arrayDiasLibres = {'diasLibres': '0'};
            }

            $('#calendar').fullCalendar('destroy');
            var miDia = new Date();
            $('#calendar').fullCalendar({
                defaultDate: miDia,
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                dayClick: function (date, jsEvent, view) {
                    if (date > miDia) {
                        for (var i = 0; i < arrayDiasLaborables.length; i++) {
                            if (date.day() === pasar_a_numero(arrayDiasLaborables[i].dia)) {
                                var validar = true;
                                for (var f = 0; f < arrayDiasLibres.length; f++) {
                                    if (date.format('YYYY-MM-DD') === arrayDiasLibres[f].diasLibres) {
                                        validar = false;
                                        break;
                                    }
                                }
                                if (validar === true) {
                                    $(this).css('background-color', 'red');
                                    var validar2 = true;
                                    for (var h = 0; h < arrayDias.length; h++) {
                                        if (arrayDias[h] == date.format('YYYY-MM-DD')) {
                                            validar2 = false;
                                            break;
                                        }
                                    }
                                    if (validar2 == true) {
                                        añadirDia(date.format('YYYY-MM-DD'));
                                    }
                                }
                            }
                        }
                    }
                },
                dayRender: function (date, cell) {
                    cell.css("background-color", "white");
                    var miDia = new Date();
                    for (var i = 0; i < arrayDiasLaborables.length; i++) {
                        if (date > miDia) {
                            if (date.day() == pasar_a_numero(arrayDiasLaborables[i].dia)) {
                                cell.css("background-color", "green");
                                for (var f = 0; f < arrayDiasLibres.length; f++) {
                                    if (date.format('YYYY-MM-DD') == arrayDiasLibres[f].diasLibres) {
                                        cell.css("background-color", "white");
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }
}
function guardarDiasLibres() {
    if (arrayDias.length == 0) {
        alert("No has seleccionado ningun dia");
    } else {
        var nombreMedico = document.getElementById("medicos").value;
        var jsonDias = JSON.stringify(arrayDias);
        objetoAjax = AJAXCrearObjeto(); //crea el objeto
        objetoAjax.open('GET', "php/GuardarDiasLibresMedico.php?medico=" + nombreMedico + "&jsonDias=" + jsonDias);
        objetoAjax.send();
        objetoAjax.onreadystatechange = function () {
            if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
                alert("los dias se han introducido correctamente");
                cargarDiasMedico(nombreMedico);
            }
        }
    }
}
function pasar_a_numero(diaString) {
    var diaNum = 0;
    switch (diaString) {
        case 'Lunes':
            diaNum = 1;
            break;
        case 'Martes':
            diaNum = 2;
            break;
        case 'Miercoles':
            diaNum = 3;
            break;
        case 'Jueves':
            diaNum = 4;
            break;
        case 'Viernes':
            diaNum = 5;
            break;
        case 'Sabado':
            diaNum = 6;
            break;
        case 'Domingo':
            diaNum = 0;
            break;
        default:
    }
    return diaNum;

}

function mostrarMedicos() {
    var datos = objetoAjax.responseText;
    var objeto = JSON.parse(datos);
    var list = document.getElementById("medicos");
    borrarHijos(list);
    for (var i = 0; i < objeto.length; i++) {
        var option = document.createElement("option");
        option.setAttribute("value", objeto[i].nombre);
        option.innerHTML = objeto[i].nombre;
        list.appendChild(option);
    }
    cargarDiasMedico(objeto[0].nombre);
}
/* FUNCIONES GENERICAS*/
function AJAXCrearObjeto() {
    if (window.XMLHttpRequest) {
// navegadores que siguen los estándares
        objetoAjax = new XMLHttpRequest();
    } else {
// navegadores obsoletos
        objetoAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return objetoAjax;
}
function borrarHijos(nodo) {
    if (nodo.hasChildNodes())
    {
        while (nodo.childNodes.length >= 1)
        {
            nodo.removeChild(nodo.firstChild);
        }
    }
}