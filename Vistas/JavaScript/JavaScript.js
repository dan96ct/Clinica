
function cargarDatosEmpresa() {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', '../php/GetDatosEmpresa.php');
    objetoAjax.send();
    objetoAjax.onreadystatechange = function () {
        if (objetoAjax.readyState === 4 && objetoAjax.status === 200) {
            mostrarDatosEmpresa();

        }
    }
}
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
function cargarEspecialidades() {
    objetoAjax = AJAXCrearObjeto(); //crea el objeto
    objetoAjax.open('GET', '../php/GetEspecialidades.php');
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
    for(var i = 0; i<objeto.length; i++){
        var option = document.createElement("option");
        option.innerHTML = objeto[i];
        list.appendChild(option);
    }
}
function mostrarDatosEmpresa() {
    var datos = objetoAjax.responseText;
    var objeto = JSON.parse(datos);
    var padre = document.getElementById("contenido");
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

    padre.appendChild(datosEmpresa);
}
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
