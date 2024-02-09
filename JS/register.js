document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = new FormData(loginForm);
      const email = formData.get('username');
      const password = formData.get('password');
  
      try {
        const response = await fetch('http://localhost:3002/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Aquí puedes manejar la respuesta del servidor
          // Por ejemplo, redirigir a otra página o mostrar un mensaje de éxito
        } else {
          console.error('Error al iniciar sesión:', response.statusText);
          // Aquí puedes manejar errores de inicio de sesión, como mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error('Error de red:', error);
        // En caso de errores de red, como problemas de conexión, puedes manejarlos aquí
      }
    });
  });
  