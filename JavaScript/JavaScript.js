
var arrayDiasLaborables;
var arrayDiasLibres;
var diaSeleccionado_objeto = "";
var diaSeleccionado_string = "";
/* FUNCIONES DE INICIO */

function cargarTitulo() {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', 'php/GetDatosEmpresa.php');
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            var datos = objetoAjax.responseText;
            var objeto = JSON.parse(datos);
            var h1 = document.getElementById("Titulo");
            h1.innerHTML = "Bienvenido a Clinica " + objeto.nombre;

        }
    }
}

/*FUNCIONES DE CONSULTA */

function cargarMedicos_especialidad(especialidad) {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetMedicosEspecialidad.php?especialidad='" + especialidad + "'");
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            mostrarMedicos();
        }
    }
}
function mostrarMedicos() {
    var datos = objetoAjax.responseText;
    var objeto = JSON.parse(datos);
    var list = document.getElementById("lista_medicos");
    borrarHijos(list);
    for (var i = 0; i < objeto.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = objeto[i].nombre;
        list.appendChild(option);
    }
    cargar_datosMedico(objeto[0].nombre);


}
function mostrarInterfazConsulta() {
    borrarPadre();
    //Lista especialidades
    var contenido = document.createElement("div");
    contenido.setAttribute("id", "contenido");

    var divInputs = document.createElement("div");
    divInputs.setAttribute("class", "divInputs");

    var h2 = document.createElement("h2");
    h2.setAttribute("id", "texto_centrado");
    h2.innerHTML = "Complete el formulario";
    contenido.appendChild(h2);

    var hr = document.createElement("hr");
    contenido.appendChild(hr);

    contenido.appendChild(divInputs);

    var div = document.createElement("div");
    div.setAttribute("class", "form-group");
    divInputs.appendChild(div);

    var label = document.createElement("label");
    label.setAttribute("for", "sel1");
    label.innerHTML = "Seleccione una especialidad:";
    div.appendChild(label);

    var select = document.createElement("select");
    select.setAttribute("class", "form-control");
    select.setAttribute("name", "lista_especialidades");
    select.setAttribute("id", "lista_especialidades");
    select.setAttribute("onChange", "cargarMedicos_especialidad(this.value)");
    div.appendChild(select);

    //Lista medicos
    var div = document.createElement("div");
    div.setAttribute("class", "form-group");
    divInputs.appendChild(div);

    var label = document.createElement("label");
    label.setAttribute("for", "sel1");
    label.innerHTML = "Seleccione un medico:";
    div.appendChild(label);

    var select = document.createElement("select");
    select.setAttribute("class", "form-control");
    select.setAttribute("name", "lista_especialidades");
    select.setAttribute("id", "lista_medicos");
    select.setAttribute("onChange", "cargar_datosMedico(this.value)");
    div.appendChild(select);

    var boton = document.createElement("button");
    boton.setAttribute("class", "btn btn-primary");
    boton.setAttribute("style", "margin:20px;");
    boton.setAttribute("onclick", "interfazElegirCita();");
    boton.innerHTML = "Aceptar";
    div.appendChild(boton);

    document.getElementById("padre").appendChild(contenido);

    var divInputs = document.createElement("div");
    divInputs.setAttribute("class", "divInputs2");
    divInputs.setAttribute("id", "divMedico_datos");
    contenido.appendChild(divInputs);

    cargarEspecialidades();

}

function interfazElegirCita() {
    var medico = document.getElementById("lista_medicos").value;
    var contenido = document.getElementById("contenido");
    borrarHijos(contenido);

    var h2 = document.createElement("h2");
    h2.setAttribute("id", "texto_centrado");
    h2.innerHTML = "Seleccione el dia";
    contenido.appendChild(h2);

    var hr = document.createElement("hr");
    contenido.appendChild(hr);

    var div = document.createElement("div");
    div.setAttribute("id", "calendar_1");
    contenido.appendChild(div);

    var div2 = document.createElement("div");
    div2.setAttribute("class", "informacion_turnos");
    contenido.appendChild(div2);
    var h2 = $("<h2>Cita para: " + medico + "</h2>");
    $('.informacion_turnos').append(h2);
    var select = $('<select id="lista_horas" ></select>');
    $('.informacion_turnos').append(select);
    cargar_diasLaborables(medico);

}

function cargar_diasLaborables(medico) {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetDatosMedicos.php?medico='" + medico + "'");
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            var datos = objetoAjax.responseText;
            var objeto = JSON.parse(datos);
            arrayDiasLaborables = objeto;
            cargarDiasLibres(medico);

        }
    }
}
function cargarDiasLibres(medico) {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetDiasLibres.php?medico=" + medico);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            var datos = objetoAjax.responseText;
            var objeto = JSON.parse(datos);
            arrayDiasLibres = objeto;
            alert(arrayDiasLibres[0].diasLibres);
            $('#calendar_1').fullCalendar('destroy');
            $('#calendar_1').fullCalendar({
                defaultDate: '2018-01-12',
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                dayClick: function (date, jsEvent, view) {
                    for (var i = 0; i < arrayDiasLaborables.length; i++) {
                        if (date.day() == pasar_a_numero(arrayDiasLaborables[i].dia)) {
                            var validar = true;
                            for (var f = 0; f < arrayDiasLibres.length; f++) {
                                if (date.format('YYYY-MM-DD') === arrayDiasLibres[f].diasLibres) {
                                    validar = false;
                                    break;
                                }
                            }
                            if (validar === true) {
                                if (diaSeleccionado_objeto !== "") {
                                    diaSeleccionado_objeto.css('background-color', 'green');
                                }
                                $(this).css('background-color', '#00FFBD');
                                diaSeleccionado_objeto = $(this);
                                diaSeleccionado_string = date.format('YYYY-MM-DD');
                                //cargarHorarioDia(medico);
                            }
                        }
                    }
                },
                dayRender: function (date, cell) {
                    cell.css("background-color", "white");
                    for (var i = 0; i < arrayDiasLaborables.length; i++) {
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
            });
        }
    }

}
function cargarHorarioDia(medico) {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetHorarioDia.php?medico='" + medico + "'&dia='" + diaSeleccionado_string + "'");
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            mostrarDatosMedicos();
        }
    }
}
function cargar_datosMedico(medico) {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetDatosMedicos.php?medico='" + medico + "'");
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            mostrarDatosMedicos();
        }
    }
}
function mostrarDatosMedicos() {
    var datos = objetoAjax.responseText;
    var objeto = JSON.parse(datos);
    var contenido = document.getElementById("contenido");
    var divInputs = document.getElementById("divMedico_datos");
    borrarHijos(divInputs);
    var h2 = document.createElement("h2");
    h2.innerHTML = objeto[0].nombre;
    divInputs.appendChild(h2);
    for (var i = 0; i < objeto.length; i++) {
        var p = document.createElement("p");
        p.innerHTML = objeto[i].dia + " de " + objeto[i].horaInicio + " a " + objeto[i].horaFinal;
        divInputs.appendChild(p);
    }

    contenido.appendChild(divInputs);
}

function cargarEspecialidades() {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', 'php/GetEspecialidades.php');
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            mostrarEspecialidades();
        }
    }

}
function mostrarEspecialidades() {
    var datos = objetoAjax.responseText;
    var objeto = JSON.parse(datos);
    var list = document.getElementById("lista_especialidades");
    for (var i = 0; i < objeto.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = objeto[i];
        list.appendChild(option);
    }
    cargarMedicos_especialidad(objeto[0]);
}
/* FUNCIONES DE CONTACTO */
function cargarDatosEmpresa() {
    borrarPadre();
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', 'php/GetDatosEmpresa.php');
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            mostrarDatosEmpresa();
        }
    }
}
function mostrarDatosEmpresa() {
    var datos = objetoAjax.responseText;
    var objeto = JSON.parse(datos);
    var datosEmpresa = document.createElement("div");
    datosEmpresa.setAttribute("class", "datosEmpresa");
    var h2 = document.createElement("h2");
    h2.innerHTML = "Clinica " + objeto.nombre;
    h2.setAttribute("style", "text-align:center;");
    datosEmpresa.appendChild(h2);
    var hr = document.createElement("hr");
    hr.setAttribute("size", "1px");
    datosEmpresa.appendChild(hr);
    var img = document.createElement("img");
    img.setAttribute("src", "Imagenes/telefonoICON.png");
    img.setAttribute("class", "icon_contacto");
    datosEmpresa.appendChild(img);
    datosEmpresa.innerHTML = datosEmpresa.innerHTML + objeto.telefono + "<br>";
    var img = document.createElement("img");
    img.setAttribute("src", "Imagenes/EmailICON.png");
    img.setAttribute("class", "icon_contacto");
    datosEmpresa.appendChild(img);
    datosEmpresa.innerHTML = datosEmpresa.innerHTML + objeto.correo + "<br>";
    var img = document.createElement("img");
    img.setAttribute("src", "Imagenes/home-512.png");
    img.setAttribute("class", "icon_contacto");
    datosEmpresa.appendChild(img);
    datosEmpresa.innerHTML = datosEmpresa.innerHTML + objeto.direccion + "<br>";
    var divContenido = document.createElement("div");
    divContenido.setAttribute("id", "contenido");
    divContenido.appendChild(datosEmpresa);
    document.getElementById("padre").appendChild(divContenido);
}
/*FUNCIONES DE PANEL DE CONTROL*/
function mostrarInterfazPanelControl() {
    borrarPadre();
    var contenido = document.createElement("div");
    contenido.setAttribute("id", "contenido");
    contenido.setAttribute("style", "width:50%;")

    var h2 = document.createElement("h2");
    h2.innerHTML = "Iniciar sesion";
    contenido.appendChild(h2);
    var form = document.createElement("form");
    form.setAttribute("action", "submit");
    contenido.appendChild(form);
    var div = document.createElement("div");
    div.setAttribute("class", "form-group");
    contenido.appendChild(div);
    var label = document.createElement("label");
    label.setAttribute("for", "email");
    label.innerHTML = "Usuario";
    div.appendChild(label);
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "form-control");
    input.setAttribute("id", "email");
    input.setAttribute("placeholder", "Introduce tu correo");
    input.setAttribute("name", "usuario");
    input.setAttribute("value", "Admin@gmail.com");
    div.appendChild(input);
    form.appendChild(div);
    var div = document.createElement("div");
    div.setAttribute("class", "form-group");
    contenido.appendChild(div);
    var label = document.createElement("label");
    label.setAttribute("for", "pwd");
    label.innerHTML = "Contraseña:";
    div.appendChild(label);
    var input = document.createElement("input");
    input.setAttribute("type", "password");
    input.setAttribute("class", "form-control");
    input.setAttribute("id", "pwd");
    input.setAttribute("placeholder", "Introduce contraseña");
    input.setAttribute("name", "pass");
    input.setAttribute("value", "1234");
    div.appendChild(input);
    var small = document.createElement("small");
    small.setAttribute("class", "form-text text-muted");
    small.innerHTML = "La contraseña del administrador es 1234 NOTA:Esto se borrará en la versión final";
    div.appendChild(small);
    form.appendChild(div);
    var boton = document.createElement("button");
    boton.setAttribute("class", "btn btn-primary btn-block");
    boton.addEventListener("click", function (event) {
        event.preventDefault();
        compruebaDatos_inicioSesion();
    });
    boton.innerHTML = "Aceptar";
    form.appendChild(boton);
    document.getElementById("padre").appendChild(contenido);
}
function compruebaDatos_inicioSesion() {
    var usuario = document.getElementById("email").value;
    var pass = document.getElementById("pwd").value;
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/CompruebaDatosUsuario.php?usuario='" + usuario + "'&pass='" + pass + "'");
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            if (objetoAjax.responseText !== "null") {
                location.href = "calendario.php?medico";
            }
        }
    }

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

function borrarPadre() {
    var padre = document.getElementById("padre");
    if (padre.hasChildNodes())
    {
        while (padre.childNodes.length >= 1)
        {
            padre.removeChild(padre.firstChild);
        }
    }
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