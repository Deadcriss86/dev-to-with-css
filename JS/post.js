// Datos a enviar
const data = {
  user: "nombreUsuario",
  detalles: "detalles del contenido",
  urlImage: "https://ejemplo.com/imagen.jpg",
  titulo: "Título del contenido"
};

// Configuración del fetch
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
};

// URL a la que enviar los datos
const url = 'http://localhost:3002/post';

// Realizar la solicitud fetch
fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta del servidor:', data);
  })
  .catch(error => {
    console.error('Error al enviar los datos:', error);
  });
  
  
  
  
  
  
  