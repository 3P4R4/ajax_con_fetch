const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const ciudades =[];

fetch(endpoint)
    .then(datos => datos.json())
    .then(datos => ciudades.push(...datos));

function traerDatos(coincidencia, ciudades) {
    return ciudades.filter(lugar => {
        const reg = new RegExp(coincidencia, 'gi'); // esta parte debo estudiarla mejor, aqui me perdi un poco
        return lugar.city.match(reg) || lugar.state.match(reg)
    });
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

function display(){
    const mostrar = traerDatos(this.value, ciudades);
    const cuerpoHtml = mostrar.map(lugar => {
        const regex = new RegExp(this.value, 'gi');
      const ciudadNombre = lugar.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const estadoNombre = lugar.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
        <span class="name">${ciudadNombre}, ${estadoNombre}</span>
        </li>

        `
    }).join('');
    sugerencia.innerHTML = cuerpoHtml;
}

const buscar = document.querySelector('.search');
const sugerencia = document.querySelector('.suggestions');

buscar.addEventListener('change', display); 
buscar.addEventListener('keyup', display); 