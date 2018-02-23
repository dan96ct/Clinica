
var arrayDiasLaborables;
var arrayDiasLibres;
var diaSeleccionado_objeto = "";
var diaSeleccionado_string = "";
var resumenDatos = {'medico': '', 'especialidad': '', 'dia': '', 'hora': ''};
var cliente = {'nif': '', 'nombre': '', 'apellido': '', 'email': '', 'pass': ''};
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
/*FUNCIONTES CANCELAR CITA*/
function interfazElegirOpcionConsulta() {
    borrarPadre();
    //Lista especialidades
    var contenido = document.createElement("div");
    document.getElementById("padre").appendChild(contenido);
    contenido.setAttribute("id", "contenido");
    $('#contenido').append('<section id="botonesOpciones"></section>');
    $('#botonesOpciones').append('<button onclick="mostrarInterfazConsulta();" style="margin-top:20px;" type="button" class="btn btn-primary btn-lg">Pedir cita</button>')
    $('#botonesOpciones').append('<button onclick="cargarInterfazCancelarCita();" style="margin-top:20px;" type="button" class="btn btn-danger btn-lg">Cancelar cita</button>')

}
function cargarInterfazCancelarCita() {
    $('#contenido').empty();
    var contenido = document.getElementById("contenido");
    var h2 = document.createElement("h2");
    h2.setAttribute("id", "texto_centrado");
    h2.innerHTML = "Cancelar cita";
    contenido.appendChild(h2);
    var hr = document.createElement("hr");
    contenido.appendChild(hr);
    $('#contenido').append('<h2 style="text-align:center;">Login</h2>');
    $('#contenido').append('<div class="form-group" style="width:70%; margin:0 auto;"><label for="Email">Introduce tu Email</label><input type="Email" class="form-control" id="Email"  placeholder="Email"></div>');
    $('#contenido').append('<div class="form-group" style="width:70%; margin:0 auto;"><label for="psw">Introduce una contraseña</label><input type="password" class="form-control" id="pass"  placeholder="Contraseña"></div>');
    $('#contenido').append('<button onclick="comprobarLoginYmostrarCitas();" style="margin-top:20px; width:70%; margin:0 auto;" type="button" class="btn btn-success btn-lg btn-block">Confirmar</button>');
}
function comprobarLoginYmostrarCitas() {
    var email = document.getElementById("Email").value;
    var pass = document.getElementById("pass").value;
    if (email != "" || pass != "") {
        var datosUsuario = {'email': email, 'pass': pass};
        var json = JSON.stringify(datosUsuario);
        objetoAjax = AJAXCrearObjeto(); //crea el objeto
        objetoAjax.open('GET', "php/GetCitasLogin.php?json=" + json);
        objetoAjax.send();
        objetoAjax.onreadystatechange = function () {
            if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
                var datos = objetoAjax.responseText;
                if (datos != false) {
                    var objeto = JSON.parse(datos);
                    mostrarCitasCliente(objeto);
                } else {
                    alert("datos incorrectos o inexistentes");
                }
            }
        }
    }
}
function mostrarCitasCliente(objeto) {
    $('#contenido').empty();
    var contenido = document.getElementById("contenido");
    var h2 = document.createElement("h2");
    h2.setAttribute("id", "texto_centrado");
    h2.innerHTML = "Cancelar cita";
    contenido.appendChild(h2);
    var hr = document.createElement("hr");
    contenido.appendChild(hr);
    $('#contenido').append('<h3 style="text-align:center;">Seleccione la cita que desea cancelar</h3>');
    $('#contenido').append('<select style="text-align:center; width:70%; margin:0 auto; margin-bottom:20px;" class="form-control" id="lista_diasCliente"></select>');
    for (var i = 0; i < objeto.length; i++) {
        $('#lista_diasCliente').append('<option name="' + objeto[i].id + '">' + objeto[i].nombreMedico + " " + objeto[i].fecha + " " + objeto[i].hora + "</option>");
    }
    $('#contenido').append('<button onclick="borrarCita();" style="margin-top:20px; width:70%; margin:0 auto;" type="button" class="btn btn-success btn-lg btn-block">Confirmar</button>');
}
function borrarCita() {
    var opciones = document.getElementsByTagName("option");
    var fechaElegida = document.getElementById("lista_diasCliente").value;
    for (var i = 0; i < opciones.length; i++) {
        if (opciones[i].innerHTML == fechaElegida) {
            var id = opciones[i].getAttribute("name");
            var objeto = {'id': id};
            var json = JSON.stringify(objeto);
            objetoAjax = AJAXCrearObjeto(); //crea el objeto
            objetoAjax.open('GET', "php/BorrarCita.php?json=" + json);
            objetoAjax.send();
            objetoAjax.onreadystatechange = function () {
                if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
                    var datos = objetoAjax.responseText;
                    $('#padre').empty();
                    $('#padre').append('<div class="alert alert-success" style="width:50%; margin:0 auto; margin-top:50px;"><strong>¡Gracias!</strong>Su cita a sido eliminada satisfactoriamente</div>');
                }
            }
        }
    }
}
/*FUNCIONES DE CONSULTA */

function cargarMedicos_especialidad(especialidad) {
    var especialidad = {'especialidad': especialidad};
    var json = JSON.stringify(especialidad);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetMedicosEspecialidad.php?json=" + json);
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
    resumenDatos.medico = medico;
    resumenDatos.especialidad = document.getElementById("lista_especialidades").value;
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
    div2.setAttribute("class", "divDerecho");
    contenido.appendChild(div2);
    var h2 = $("<h2>Cita para: " + medico + "</h2>");
    $('.divDerecho').append(h2);
    var select = $('<select id="lista_horas"></select>');
    $('.divDerecho').append('<h3>Seleccione un horario</h3>');
    $('.divDerecho').append(select);
    $('.divDerecho').append('<br><button onclick="cargarInterfazFormulario();" style="margin-top:20px;" type="button" class="btn btn-primary">Confirmar</button>');
    cargar_diasLaborables(medico);
}
function cargarInterfazFormulario() {
    var validar = true;
    if (document.getElementById("lista_horas") !== null) {
        if (document.getElementById("lista_horas").value !== "") {
            resumenDatos.hora = document.getElementById("lista_horas").value;
            resumenDatos.dia = diaSeleccionado_string;
        } else {
            alert("Por favor seleccione un dia y una hora");
            validar = false;
        }
    }
    if (validar == true) {
        var contenido = document.getElementById("contenido");
        borrarHijos(contenido);
        $('#contenido').append('<h2 id="texto_centrado">Confirmacion de datos</h2>');
        var hr = document.createElement("hr");
        contenido.appendChild(hr);
        $('#contenido').append('<div class="divIzquierdo"></div>');
        $('.divIzquierdo').append('<button onclick="cargarFormularioRegistro();" style="margin-top:20px;" type="button" class="btn btn-primary btn-lg btn-block">Registrar</button><br>\n\
                               <button onclick="cargarFormularioLogin();" style="margin-top:20px;" type="button" class="btn btn-secondary btn-lg btn-block">Login</button>');
        $('#contenido').append('<div class="divDerecho"></div>');
        $('.divDerecho').append('<h3>Resumen de datos</h3>');
        $('.divDerecho').append('<strong>Especialidad:</strong>' + resumenDatos.especialidad + '<br>');
        $('.divDerecho').append('<strong>Medico:</strong>' + resumenDatos.medico + '<br>');
        $('.divDerecho').append('<strong>Dia:</strong>' + resumenDatos.dia + '<br>');
        $('.divDerecho').append('<strong>Hora:</strong>' + resumenDatos.hora);
    }
}
function cargarFormularioRegistro() {
    $('.divIzquierdo').empty();
    $('.divIzquierdo').append('<button onclick="cargarInterfazFormulario()" style="margin-top:20px;" type="button" class="btn btn-primary">Volver</button>');
    $('.divIzquierdo').append('<h2>Registro</h2>');
    $('.divIzquierdo').append('<div class="form-group"><label for="NIF">Introduce tu NIF</label><input type="text" class="form-control" id="NIF"  placeholder="NIF"></div>');
    $('.divIzquierdo').append('<div class="form-group"><label for="Nombre">Introduce tu Nombre</label><input type="text" class="form-control" id="Nombre"  placeholder="Nombre"></div>');
    $('.divIzquierdo').append('<div class="form-group"><label for="Apellido">Introduce tu Apellido</label><input type="text" class="form-control" id="Apellido"  placeholder="Apellido"></div>');
    $('.divIzquierdo').append('<div class="form-group"><label for="Email">Introduce tu Email</label><input type="Email" class="form-control" id="Email"  placeholder="Email"></div>');
    $('.divIzquierdo').append('<div class="form-group"><label for="psw">Introduce una contraseña</label><input type="password" class="form-control" id="pass"  placeholder="Contraseña"></div>');
    $('.divIzquierdo').append('<button onclick="guardarDatosRegistro();" style="margin-top:20px;" type="button" class="btn btn-success btn-lg btn-block">Confirmar</button>');
}
function cargarFormularioLogin() {
    $('.divIzquierdo').empty();
    $('.divIzquierdo').append('<button onclick="cargarInterfazFormulario()" style="margin-top:20px;" type="button" class="btn btn-primary">Volver</button>');
    $('.divIzquierdo').append('<h2>Login</h2>');
    $('.divIzquierdo').append('<div class="form-group"><label for="Email">Introduce tu Email</label><input type="Email" class="form-control" id="Email"  placeholder="Email"></div>');
    $('.divIzquierdo').append('<div class="form-group"><label for="psw">Introduce una contraseña</label><input type="password" class="form-control" id="pass"  placeholder="Contraseña"></div>');
    $('.divIzquierdo').append('<button onclick="comprobarLogin();" style="margin-top:20px;" type="button" class="btn btn-success btn-lg btn-block">Confirmar</button>');
}
function comprobarLogin() {
    var email = document.getElementById('Email').value;
    var pass = document.getElementById('pass').value;
    var objeto = {'email': email, 'pass': pass};
    var respJSON = JSON.stringify(objeto);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/ComprobarLogin.php?json=" + respJSON);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            var datos = objetoAjax.responseText;
            if (datos != false) {
                var objeto = JSON.parse(datos);
                alert(objeto.nombre);
                cliente.nombre = objeto.nombre;
                cliente.nif = objeto.nif;
                cliente.apellido = objeto.apellido;
                cliente.email = objeto.email;
                $('.divIzquierdo').empty();
                $('.divIzquierdo').attr("style")
                $('.divIzquierdo').append('<h2>Datos de cliente</h2>');
                $('.divIzquierdo').append('<strong>nif:</strong>' + cliente.nif + '<br>');
                $('.divIzquierdo').append('<strong>nombre:</strong>' + cliente.nombre + '<br>');
                $('.divIzquierdo').append('<strong>apellido:</strong>' + cliente.apellido + '<br>');
                $('.divIzquierdo').append('<strong>Email:</strong>' + cliente.email);
                $('.divIzquierdo').append('<button onclick="guarDatosCitaSolo();" style="margin-top:20px;" type="button" class="btn btn-success btn-lg btn-block">Confirmar datos</button>');
            } else {
                alert("datos incorrectos o inexistentes, registrate si no lo has hecho");
                cargarInterfazFormulario();
            }
        }
    }
}
function guardarDatosRegistro() {
    var nif = document.getElementById('NIF').value;
    var nombre = document.getElementById('Nombre').value;
    var apellido = document.getElementById('Apellido').value;
    var email = document.getElementById('Email').value;
    var pass = document.getElementById('pass').value;
    if (nif == "" || nombre == "" || apellido == "" || email == "" || pass == "") {
    } else {
        cliente.nif = nif;
        cliente.nombre = nombre;
        cliente.apellido = apellido;
        cliente.email = email;
        cliente.pass = pass;
        $('.divIzquierdo').empty();
        $('.divIzquierdo').attr("style")
        $('.divIzquierdo').append('<h2>Datos de cliente</h2>');
        $('.divIzquierdo').append('<strong>nif:</strong>' + cliente.nif + '<br>');
        $('.divIzquierdo').append('<strong>nombre:</strong>' + cliente.nombre + '<br>');
        $('.divIzquierdo').append('<strong>apellido:</strong>' + cliente.apellido + '<br>');
        $('.divIzquierdo').append('<strong>Email:</strong>' + cliente.email);
        $('.divIzquierdo').append('<button onclick="guardarDatosRegistroBD();" style="margin-top:20px;" type="button" class="btn btn-success btn-lg btn-block">Confirmar datos</button>');
    }
}
function guardarDatosRegistroBD() {
    var respJSON = JSON.stringify(cliente);
    var respJSON2 = JSON.stringify(resumenDatos);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GuardarDatosRegistro.php?json=" + respJSON + "&json2=" + respJSON2);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            if (objetoAjax.responseText == false) {
                alert("Ya te has registrado, por favor ve a login");
                cargarInterfazFormulario();
            } else {
                enviarEmail();
                $('#padre').empty();
                $('#padre').append('<div class="alert alert-success" style="width:50%; margin:0 auto; margin-top:50px;"><strong>¡Gracias!</strong>En breve deberia recivir un email con la confirmación</div>');
            }
        }
    }
}
function guarDatosCitaSolo() {
    var respJSON = JSON.stringify(cliente);
    var respJSON2 = JSON.stringify(resumenDatos);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GuardarCita.php?json=" + respJSON + "&json2=" + respJSON2);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            if (objetoAjax.responseText == false) {
                alert("Ha surgido un problema");
                cargarInterfazFormulario();
            } else {
                enviarEmail();
                $('#padre').empty();
                $('#padre').append('<div class="alert alert-success" style="width:50%; margin:0 auto; margin-top:50px;"><strong>¡Gracias!</strong>En breve deberia recivir un email con la confirmación</div>');
            }
        }
    }
}
function enviarEmail() {
    var respJSON = JSON.stringify(cliente);
    var respJSON2 = JSON.stringify(resumenDatos);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/Enviar_email.php?json=" + respJSON + "&json2=" + respJSON2);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
        }
    }
}
function cargar_diasLaborables(medico) {
    var objeto = {'medico': medico};
    var json = JSON.stringify(objeto);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetDatosMedicos.php?json=" + json);
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
    var objeto = {'medico': medico};
    var json = JSON.stringify(objeto);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetDatosMedicos.php?json=" + json);
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
            $('#calendar_1').fullCalendar('destroy');
            var miDia = new Date();
            $('#calendar_1').fullCalendar({
                defaultDate: miDia,
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                dayClick: function (date, jsEvent, view) {
                    if (date > miDia) {
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
                                    cargarHorarioDia(medico, diaSeleccionado_string);
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
function cargarHorarioDia(medico, dia) {
    var objeto = {'medico': medico, 'dia': dia};
    var json = JSON.stringify(objeto);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetHorarioDia.php?json=" + json);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            mostrarHorarioDia();
        }
    }
}
function mostrarHorarioDia() {
    var datos = objetoAjax.responseText;
    var objeto = JSON.parse(datos);
    $('#lista_horas').empty();
    for (var i = 0; i < objeto.length; i++) {
        $('#lista_horas').append('<option>' + objeto[i].tramoInicio + '</option>')
    }
}
function cargar_datosMedico(medico) {
    var objeto = {'medico': medico};
    var json = JSON.stringify(objeto);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetDatosMedicos.php?json=" + json);
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
    var objeto = {'usuario': usuario, 'pass': pass};
    var json = JSON.stringify(objeto);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/CompruebaDatosUsuario.php?json=" + json);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            if (objetoAjax.responseText != "null") {
                mostrarOpcionesPanelControl();
            }
        }
    }

}
function mostrarOpcionesPanelControl() {
    $('#contenido').empty();
    $('#contenido').append('<button onclick="reenviarADiasLibres();" style="margin-top:20px;" type="button" class="btn btn-success btn-lg btn-block">Dar dias libres a medicos</button>');
    $('#contenido').append('<button onclick="mostrarCitasMedicos();" style="margin-top:20px;" type="button" class="btn btn-success btn-lg btn-block">Ver citas de medicos</button>');
}
function mostrarCitasMedicos() {
    $('#contenido').empty();
    var contenido = document.getElementById("contenido");
    var h2 = document.createElement("h2");
    h2.setAttribute("id", "texto_centrado");
    h2.innerHTML = "Seleccione un medico";
    contenido.appendChild(h2);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetMedicos.php");
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            var datos = objetoAjax.responseText;
            var objeto = JSON.parse(datos);
            $('#contenido').append('<select class="form-control" id="medicos" onchange="cargarCitasMedicos(this.value); "></select>');
            $('#medicos').empty();
            for (var i = 0; i < objeto.length; i++) {
                var option = document.createElement("option");
                option.setAttribute("value", objeto[i].nombre);
                option.innerHTML = objeto[i].nombre;
                $('#medicos').append(option);
            }
            cargarCitasMedicos(objeto[0].nombre);
        }
    }
}
function cargarCitasMedicos(medico) {
    var datosMedico = {'medico': medico};
    var json = JSON.stringify(datosMedico);
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetCitasMedicos.php?json=" + json);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            var datos = objetoAjax.responseText;
            if (datos != false) {
                var objeto = JSON.parse(datos);
                $('#tabla_citas').remove();
                $('#contenido').append('<table id="tabla_citas"></tabla>');
                
                $('#tabla_citas').append('<tr><td>cliente</td><td>dia</td><td>hora</td><tr>');
                for (var i = 0; i < objeto.length; i++) {
                    $('#tabla_citas').append('<tr><td>'+objeto[i].nombreUsuario+'</td><td>'+objeto[i].fecha+'</td><td>'+objeto[i].hora+'</td><tr>');
                }
            } else {
                alert("datos incorrectos o inexistentes");
            }
        }
    }
}
function reenviarADiasLibres() {
    location.href = "calendario.html";
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