// Array para almacenar los productos
let productos = [];

// Función para crear un nuevo producto
/**
 * Crea un objeto de producto con un identificador único basado en el timestamp
 * @param {string} nombre - Nombre del producto
 * @param {number} precio - Precio del producto
 * @param {string} imagen - Ruta o URL de la imagen del producto
 * @returns {Object} Objeto producto con id, nombre, precio e imagen
 */
const crearProducto = (nombre, precio, imagen) => ({
    id: Date.now(), // Identificador único usando timestamp
    nombre,
    precio,
    imagen
});

// Función para renderizar los productos
function renderizarProductos() {
    const contenedor = document.querySelector('.products-container');
    const cardEjemplo = contenedor.firstElementChild.cloneNode(true);
    contenedor.innerHTML = ''; // Limpiar el contenedor
    contenedor.appendChild(cardEjemplo); // Volver a agregar la card de ejemplo

    // Renderizar productos dinámicos
    productos.forEach(({ id, nombre, precio, imagen }) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${imagen}" alt="${nombre}" onerror="manejarErrorImagen(this)">
            <div class="card-container--info">
                <p>${nombre}</p>
                <div class="card-container--value">
                    <p>$ ${parseFloat(precio).toFixed(2)}</p>
                    <img src="./assets/trashIcon.png" alt="Eliminar" 
                         onclick="eliminarProducto(${id})">
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Función para agregar un nuevo producto
import { postData } from './js/api.js';

async function agregarProducto(evento) {
    evento.preventDefault();

    // Obtener valores del formulario
    const form = document.getElementById('product-form');
    const nombre = form.elements[0].value;
    const precio = parseFloat(form.elements[1].value).toFixed(2);
    const imagen = form.elements[2].value;

    // Crear objeto de producto
    const nuevoProducto = {
        nombre,
        precio,
        imagen,
    };

    // Enviar producto al servidor fake usando POST
    const productoCreado = await postData('productos', nuevoProducto);
    if (productoCreado) {
        // Agregar el producto creado al array local y renderizar
        productos.push(productoCreado);
        renderizarProductos(); // Función que actualiza el DOM
        form.reset(); // Limpiar el formulario
    } else {
        console.error('No se pudo crear el producto.');
    }
}


    // Obtener valores del formulario
    const form = document.getElementById('product-form');
    const [nombre, precio, imagen] = Array.from(form.elements).map(el => el.value);

    // Crear y agregar nuevo producto
    productos.push(crearProducto(nombre, precio, imagen));

    // Actualizar el localStorage y renderizar productos actualizados
    guardarProductos();
    renderizarProductos();

    // Limpiar formulario
    form.reset();
}

// Función para eliminar un producto
function eliminarProducto(id) {
    productos = productos.filter(producto => producto.id !== id);
    guardarProductos();
    renderizarProductos();
}

// Función para guardar productos en localStorage
function guardarProductos() {
    localStorage.setItem('aluraGeek_productos', JSON.stringify(productos));
}

// Función para cargar productos desde localStorage
function cargarProductos() {
    const productosGuardados = localStorage.getItem('aluraGeek_productos');
    if (!productosGuardados) return;
    
    productos = JSON.parse(productosGuardados);
    renderizarProductos();
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    cargarProductosDesdeAPI();

    const form = document.getElementById('product-form');
    form.addEventListener('submit', agregarProducto);

    // Validación de imagen antes de enviar
    const imagenInput = form.elements[2];
    imagenInput.addEventListener('change', () => {
        const img = new Image();
        img.onerror = () => imagenInput.setCustomValidity('Por favor, ingrese una URL de imagen válida');
        img.onload = () => imagenInput.setCustomValidity('');
        img.src = imagenInput.value;
    });
});

// Función para manejar errores de carga de imagen
function manejarErrorImagen(elemento) {
    elemento.src = './assets/misproductos.jpg'; // Imagen por defecto actualizada a .jpg
    elemento.onerror = null; // Prevenir bucle infinito
}

import { getData } from './js/api.js';

async function cargarProductosDesdeAPI() {
    const productosAPI = await getData('productos');
    if (productosAPI) {
        productos = productosAPI;
        renderizarProductos();
    }
}

import { inicializarProductos } from './js/listarProductos.js';

document.addEventListener('DOMContentLoaded', () => {
    inicializarProductos(); // Llama a la función que carga y renderiza los productos

    const form = document.getElementById('product-form');
    form.addEventListener('submit', agregarProducto);
    import { inicializarCreacionDeVideos } from './js/crearVideo.js';

    document.addEventListener('DOMContentLoaded', () => {
        inicializarCreacionDeVideos(); // Inicializa la funcionalidad para capturar y enviar videos
        import { inicializarListadoProductos } from './js/listarProductos.js';

        document.addEventListener('DOMContentLoaded', () => {
            inicializarListadoProductos(); // Inicializa el listado de productos con la funcionalidad de eliminación
        });
        