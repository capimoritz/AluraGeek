const API_URL = './db.json'; // Ruta al servidor fake

/**
 * Realiza una requisición GET al servidor y devuelve los datos.
 * @param {string} endpoint - Endpoint del recurso a obtener.
 * @returns {Promise<any>} - Promesa que resuelve con los datos obtenidos.
 */
export async function getData(endpoint) {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        const data = await response.json();
        return data[endpoint];
    } catch (error) {
        console.error('Error en la requisición GET:', error);
        return null;
    }
}

/**
 * Realiza una requisición POST al servidor para crear un nuevo producto.
 * @param {string} endpoint - Endpoint del recurso donde se enviarán los datos.
 * @param {Object} nuevoProducto - Objeto con los datos del producto a crear.
 * @returns {Promise<any>} - Promesa que resuelve con el producto creado o null si hay error.
 */
export async function postData(endpoint, nuevoProducto) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProducto),
        });

        if (!response.ok) {
            throw new Error(`Error al crear el producto: ${response.statusText}`);
        }

        return await response.json(); // Retorna el producto creado
    } catch (error) {
        console.error('Error en la requisición POST:', error);
        return null;
    }
}

/**
 * Realiza una solicitud DELETE al servidor para eliminar un producto.
 * @param {string} endpoint - Endpoint del recurso a eliminar.
 * @param {number} id - ID del recurso a eliminar.
 * @returns {Promise<boolean>} - Promesa que resuelve a true si se elimina correctamente, o false en caso de error.
 */
export async function deleteData(endpoint, id) {
    try {
        const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el recurso: ${response.statusText}`);
        }

        return true; // Confirmación de eliminación
    } catch (error) {
        console.error('Error en la requisición DELETE:', error);
        return false;
    }
}