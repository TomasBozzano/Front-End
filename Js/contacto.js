async function enviarFormulario() {
    try {
        const nombre = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('message').value;

        const response = await fetch('https://formspree.io/f/xkggblpk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                email: email,
                mensaje: mensaje
            })
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        alert('Formulario enviado con éxito');
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario');
    }
}

document.getElementById('formularioContacto').addEventListener('submit', function(event) {
    event.preventDefault();
    enviarFormulario();
});