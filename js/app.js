// VARIABLES

// las variables segun los select para ir viendo los eventos sobre los mismos
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// variable resultado donde inyectamos el html del resultado de la bd
const resultadoHtml = document.querySelector('#resultado');
const contenedor = document.querySelector('.contenedor');


// creamos las variables para los años del select
const max = new Date().getFullYear(); // esta construccion de la fecha actual
const min = max - 10;

// creamos un objeto principal para las busquedas donde valla almacenando todas las selecciones de las busquedas
// donde al seleccionar alguna marca por ejempplo se llene es campo dentro del objeto
const datosBusqueda = {
    marca: '',
    year: '',
    maximo: '',
    minimo: '',
    puertas: '',
    color: '',
    transmision: '',
};

// EVENTOS


// cuando carga el documento cargamos todos los autos a mostrar
document.addEventListener('DOMContentLoaded', () => {

    // muestra los automoviles al cargar la pagina
    mostrarAutos(autos);

    // muestra los select de los años
    mostrarYears();
});

// event listener para los select de busqueda donde vamos a ir llenando el objeto con las selecciones del usuario
marca.addEventListener('change', (e) => {
    // asignamos el valor que seleccionamos al objeto
    datosBusqueda.marca = e.target.value;

    // llamamos a la funcion filtrarAuto para realizar el filtrado segun la busqueda
    filtrarAuto();
});
year.addEventListener('change', (e) => {
    // asignamos el valor que seleccionamos al objeto
    datosBusqueda.year = parseInt(e.target.value); // lo pasamos a numero entero ya que este viene como string de un formulario

    filtrarAuto();
});
maximo.addEventListener('change', (e) => {
    // asignamos el valor que seleccionamos al objeto
    datosBusqueda.maximo = parseInt(e.target.value);

    filtrarAuto();
});
minimo.addEventListener('change', (e) => {
    // asignamos el valor que seleccionamos al objeto
    datosBusqueda.minimo = parseInt(e.target.value);

    filtrarAuto();
});
puertas.addEventListener('change', (e) => {
    // asignamos el valor que seleccionamos al objeto
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});
color.addEventListener('change', (e) => {
    // asignamos el valor que seleccionamos al objeto
    datosBusqueda.color = e.target.value;

    filtrarAuto();
});
transmision.addEventListener('change', (e) => {
    // asignamos el valor que seleccionamos al objeto
    datosBusqueda.transmision = e.target.value;
    
    filtrarAuto();
});


// FUNCIONES
function mostrarAutos(autos) {

    // cuando vamos a mostrar resultados nuevos necesitamos limpiar el contenido anterior
    limpiarHTML();

    // iteramos sobre el arreglo de autos creado desde la base de datos
    autos.forEach(auto => {
        // hacemos el destructuring
        const {marca, modelo, color, puertas, transmision, year, precio} = auto;

        // creamos un parrafo por cada elemento
        const muestraAuto = document.createElement('p');

        // cargamos en el parrafo cada elemento extraido desde el arreglo de db
        muestraAuto.textContent = `${marca}-${modelo}-${color}-Puertas: ${puertas}-${transmision}-${year}-${precio}`;

        // aca lo vamos insertando en el HTML
        resultadoHtml.appendChild(muestraAuto);
    });
};

function limpiarHTML() {
    while (resultadoHtml.firstChild) { // aca comprobamos que en el HTML tenga hijos y los vamos borrando hasta que el primer hijo no exista mas
        resultadoHtml.removeChild(resultadoHtml.firstChild);
    };
};

function mostrarYears() {
    for(let i = max; i >= min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option); // agrega cada option al select, por cada iteracion agrega un año abajo del otro por appendChild
    };
};

// funcion filtrado de auto
function filtrarAuto() { // se pueden ir encadenando los filtros, INCREIBLE
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    console.log(resultado);
    if(resultado.length === 0) {
        noResultado();
    } else {
        mostrarAutos(resultado);
    };
    
};
function noResultado() {
    limpiarHTML();
    const mensaje = document.createElement('p');
    mensaje.textContent = 'No existen resultados para su busqueda';
    mensaje.classList.add('error', 'alerta');
    contenedor.insertBefore(mensaje, resultadoHtml);
};

function filtrarMarca(auto) { // aca nos llama filter, donde retornamos los autos que tengan esa marca, si no existen retornamos todos los autos porque la seleccion esta vacia
    const {marca} = datosBusqueda;
    if(marca) {
        return auto.marca === marca; // aca retornamos los valores iguales a la seleccion, siempre y cuando hay un string en marca
    };
    return auto; // como no hay nada en marca cuando seleccionamos entonces devuelve todo
};

function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if(year) {
        return auto.year === year; 
    }
    return auto;
};

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if(minimo) {
        return auto.precio >= minimo; // compararmos sobre el CAMPO PRECIOOOOOO
    };
    return auto;
};

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    console.log(maximo);
    if(maximo) {
        return auto.precio <= maximo; // compararmos sobre el CAMPO PRECIOOOOOO
    };
    return auto;
};

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if(puertas) {
        return auto.puertas === puertas;
    };
    return auto;
};

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    };
    return auto;
};

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if(color) {
        return auto.color === color;
    };
    return auto;
};
