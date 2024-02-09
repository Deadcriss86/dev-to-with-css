let datosContainer = document.getElementById('userDataContainer');
let arrayDatos = [];

function obtenerDatosDeAPI(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema al obtener los datos.');
      }
      return response.json();
    })
    .then(datas => {
      console.log('Datos obtenidos de la API:');
      const datos = datas.data;
      console.log('Array de datos:');
      console.log(datos);

      datos.forEach((dato, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <img src="${dato.urlImage}" alt="${dato.titulo}">
          <p>Usuario: ${dato.user}</p>
          <p>Detalles: ${dato.detalles}</p>
          <p>Fecha de Creación: ${dato.createdAt}</p>
          <button class="detail-btn btn btn-primary" data-char-id="${dato._id}">Ver más</button>
          <hr>
        `;
        datosContainer.appendChild(div);
      });
      
      //Seleccionamos todos los botones de ver más después de agregarlos al DOM
      let detailBtns = document.querySelectorAll(".detail-btn");

      //a cada botón, le agregamos un listener
      detailBtns.forEach((button) => {
        button.addEventListener("click", (event) => {
          let charId = event.target.dataset.charId;
          window.open(`views/char-detail.html?charId=${charId}`);
        });
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Filtrado
let relevantButtom = document.getElementById("relevantButtom");
let latestButtom = document.getElementById("latestButtom");
let topButtom = document.getElementById("topButtom");
let search = document.getElementById("filter-by-name");

eventListeners();

function eventListeners() {
  relevantButtom.addEventListener("click", relevantFuncion);
  latestButtom.addEventListener("click", lastestFunction);
  topButtom.addEventListener("click", topFunction);
  search.addEventListener("input", debounce(searchFunction, 300)); // Añadir una demora para mejorar la eficiencia
}

function relevantFuncion() {
  let relevantPost = arrayDatos.filter(objeto => objeto.detalles.length > 10);
  printAllCards(relevantPost);
}

function lastestFunction() {
  let lastDate = arrayDatos.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  printAllCards(lastDate);
}

function topFunction() {
  let relevantPost1 = arrayDatos.filter(objeto => objeto.urlImage.length > 70);
  printAllCards(relevantPost1);
}

function searchFunction(e) {
  let searchTerm = e.target.value.toLowerCase();
  let relevantPost2 = arrayDatos.filter(objeto => {
    return objeto.user.toLowerCase().includes(searchTerm) || // Buscar por usuario
           objeto.detalles.toLowerCase().includes(searchTerm) || // Buscar por detalles
           objeto.createdAt.toLowerCase().includes(searchTerm); // Buscar por fecha de creación
  });
  printAllCards(relevantPost2);
}

// Función para retrasar la ejecución de la función de búsqueda
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const urlAPI = 'http://localhost:3002/post';
obtenerDatosDeAPI(urlAPI);