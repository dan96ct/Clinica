/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var arrayDias;
var nombreMedico;
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
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetDatosMedicos.php?medico='" + medico + "'");
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            var datos = objetoAjax.responseText;
            var objeto = JSON.parse(datos);
            mostrarDiasCalendario(pasar_a_numero(objeto[0].dia));
        }
    }
}
function mostrarDiasCalendario(num) {
    $('#calendar').fullCalendar('destroy');
    $('#calendar').fullCalendar({
        defaultDate: '2018-01-12',
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        dayClick: function (date, jsEvent, view) {
            if (date.day() == num) {
                añadirDia(date);
                $(this).css('background-color', 'red');
            }
        }, dayRender: function (date, cell) {
            cell.css("background-color", "white");
            if (date.day() == num) {
                cell.css("background-color", "green");
            }
        }
    });
}
function guardarDiasLibres() {
    var nombreMedico = document.getElementById("medicos").value;
    var jsonDias = JSON.stringify(arrayDias);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GuardarDiasLibresMedico.php?medico="+nombreMedico+"&jsonDias="+jsonDias);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
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