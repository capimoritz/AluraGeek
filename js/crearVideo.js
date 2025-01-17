import { postData } from './api.js'; // Importa la función para enviar datos

/**
 * Inicializa la funcionalidad de creación de videos.
 */
function inicializarCreacionDeVideos() {
    const form = document.querySelector('[data-video-form]'); // Selecciona el formulario con un data-attribute

    form.addEventListener('submit', async (evento) => {
        evento.preventDefault(); // Evita la recarga de la página

        // Capturar valores de los inputs
        const titulo = form.querySelector('[data-input-titulo]').value;
        const descripcion = form.querySelector('[data-input-descripcion]').value;
        const url = form.querySelector('[data-input-url]').value;

        // Crear el objeto del video
        const nuevoVideo = { titulo, descripcion, url };

        try {
            // Enviar el video al servidor fake
            const videoCreado = await postData('videos', nuevoVideo);

            if (videoCreado) {
                alert('¡Video creado exitosamente!');
                form.reset(); // Limpia el formulario
            } else {
                alert('Hubo un error al crear el video. Intenta nuevamente.');
            }
        } catch (error) {
            console.error('Error al enviar el video:', error);
            alert('No se pudo crear el video. Por favor, verifica la consola para más detalles.');
        }
    });
}

export { inicializarCreacionDeVideos };
