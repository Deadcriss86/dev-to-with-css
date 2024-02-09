let datosContainer=document.getElementById('userDataContainer')

function obtenerDatosDeAPI(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema al obtener los datos.');
      }
      return response.json();
    })
    .then(datas => {
      // Imprimir los valores en la consola
      console.log('Datos obtenidos de la API:');
      const datos = datas.data;

// Imprimir el array de datos en la consola
      console.log('Array de datos:');
      console.log(datos);

      datos.forEach(dato => {
        const div = document.createElement("div");
        div.innerHTML = `
          <img src="${dato.urlImage}" alt="${dato.titulo}">
          <p>Usuario: ${dato.user}</p>
          <p>Detalles: ${dato.detalles}</p>
          <p>Fecha de Creación: ${dato.createdAt}</p>
          <hr>
        `;
        datosContainer.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Ejemplo de uso
const urlAPI = 'http://localhost:3002/post';
obtenerDatosDeAPI(urlAPI);
