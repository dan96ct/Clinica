/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var arrayDias;
var nombreMedico;
function introducirNombreMedico(nombre){
    nombreMedico = nombre;
    document.getElementById("titulo").innerHTML = "Calendario de " + nombreMedico;
}
function crearArrayDias() {
    arrayDias = [];
}
function añadirDia(dia) {
    arrayDias.push(dia);
}
function mostrarArray() {
    alert(arrayDias);
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