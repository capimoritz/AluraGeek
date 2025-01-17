import { postData } from './api.js'; // Importar la función POST para enviar los datos

/**
 * Captura los valores del formulario y crea un nuevo producto.
 */
function inicializarCreacionDeProductos() {
    const form = document.querySelector('[data-product-form]'); // Selecciona el formulario usando data-attributes

    form.addEventListener('submit', async (evento) => {
        evento.preventDefault(); // Evita la recarga de la página

        // Capturar los valores de los inputs
        const nombre = form.querySelector('[data-input-nombre]').value;
        const precio = parseFloat(form.querySelector('[data-input-precio]').value).toFixed(2);
        const imagen = form.querySelector('[data-input-imagen]').value;

        // Crear el objeto del producto
        const nuevoProducto = { nombre, precio, imagen };

        // Enviar el producto al servidor
        const productoCreado = await postData('productos', nuevoProducto);
        if (productoCreado) {
            alert('Producto creado exitosamente!');
            form.reset(); // Limpiar el formulario después de crear el producto
        } else {
            alert('Error al crear el producto. Inténtalo nuevamente.');
        }
    });
}

export { inicializarCreacionDeProductos };
