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
    cargar_datosMedico(objeto.indexOf(0).nombre);
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

    document.getElementById("padre").appendChild(contenido);

    cargarEspecialidades();
}
function cargar_datosMedico(medico) {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', "php/GetDatosMedicos.php?medico=" + medico);
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            alert(objetoAjax.responseText);
        }
    }
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

    var telefono = document.createElement("label");
    telefono.innerHTML = "Telefono: ";
    datosEmpresa.appendChild(telefono);
    datosEmpresa.innerHTML = datosEmpresa.innerHTML + objeto.telefono + "<br>";

    var correo = document.createElement("label");
    correo.innerHTML = "Correo:  ";
    datosEmpresa.appendChild(correo);
    datosEmpresa.innerHTML = datosEmpresa.innerHTML + objeto.correo + "<br>";

    var correo = document.createElement("label");
    correo.innerHTML = "Dirección:  ";
    datosEmpresa.appendChild(correo);
    datosEmpresa.innerHTML = datosEmpresa.innerHTML + objeto.direccion + "<br>";

    var divContenido = document.createElement("div");
    divContenido.setAttribute("id", "contenido");
    divContenido.appendChild(datosEmpresa);
    document.getElementById("padre").appendChild(divContenido);
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
