const idElemento = document.getElementById('id');
const usuarioElemento = document.getElementById('usuario');
const detallesElemento = document.getElementById('detalles');
const imagenElemento= document.getElementById('imagen')
/*construye un objeto del tipo searchParams, que contiene todos los parámetros que pasamos en la url*/
const urlParams = new URLSearchParams(window.location.search);
const postDetailsContainer = document.getElementById('post-details');
console.log(urlParams);

/*extraemos un parámetro específico y lo guardamos en una variable*/
const charId = urlParams.get("charId");


function obtenerDatosDeAPI(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los datos.');
            }
            return response.json();
        })
        .then(data => {
            console.log('datos recibidos de la API:', data);
            const mensajeElemento = document.getElementById('mensaje');

            // Asignar valores a los elementos HTML
            idElemento.textContent = data.data._id;
            usuarioElemento.textContent = data.data.user;
            detallesElemento.textContent = data.data.detalles;
            imagenElemento.src=data.data.urlImage;
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API:', error);
        });
}

const urlAPI = `http://localhost:3002/post/${charId}`;
obtenerDatosDeAPI(urlAPI);