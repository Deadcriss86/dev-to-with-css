const datosContainer = document.getElementById('userDataContainer');

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
            <button class="detail-btn btn btn-primary" data-char-id="${index}">Ver más</button>
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

  const urlAPI = 'http://localhost:3002/post';
  obtenerDatosDeAPI(urlAPI);