import { getData, deleteData } from './api.js'; // Importa las funciones necesarias
/**
 * Renderiza los productos en el contenedor de tarjetas.
 * @param {Array} productos - Array de objetos de productos a renderizar.
 */
function renderizarProductos(productos) {
    const contenedor = document.querySelector('[data-productos-container]'); // Contenedor de productos
    contenedor.innerHTML = ''; // Limpia el contenido anterior

    productos.forEach(producto => {
        const cardHTML = `
            <div class="card" data-product-id="${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='./assets/misproductos.jpg'">
                <div class="card-container--info">
                    <p>${producto.nombre}</p>
                    <div class="card-container--value">
                        <p>$ ${parseFloat(producto.precio).toFixed(2)}</p>
                        <img src="./assets/trashIcon.png" alt="Eliminar" class="btn-eliminar" data-id="${producto.id}">
                    </div>
                </div>
            </div>
        `;
        contenedor.insertAdjacentHTML('beforeend', cardHTML); // Añade la tarjeta al contenedor
    });

    // Asignar evento de eliminación a cada ícono de eliminar
    contenedor.querySelectorAll('.btn-eliminar').forEach(boton => {
        boton.addEventListener('click', async (evento) => {
            const idProducto = evento.target.dataset.id;
            const eliminado = await deleteData('productos', idProducto);

            if (eliminado) {
                alert('Producto eliminado exitosamente.');
                evento.target.closest('.card').remove(); // Elimina la tarjeta del DOM
            } else {
                alert('Hubo un error al intentar eliminar el producto.');
            }
        });
    });
}

/**
 * Carga los productos desde la API y los renderiza.
 */
export async function inicializarProductos() {
    try {
        const productos = await getData('productos'); // Obtiene los productos desde la API
        if (productos) {
            renderizarProductos(productos); // Renderiza los productos en el DOM
        } else {
            console.error('No se pudieron cargar los productos.');
        }
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}