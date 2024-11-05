import Directory from './model.mjs';
import User from '../user/model.mjs';
import { sendPushNotificationByComplex } from '../../services/pushNotifications.mjs';

/**
 * Agrega un nuevo directorio.
 * @param {Object} directory - El objeto del directorio.
 * @returns {Promise<Object>} - Retorna el directorio creado.
 * @throws {Error} - Retorna un error si ocurre algún problema.
 */
export const add = async (directory) => {
    try {
        const newDirectory = new Directory(directory);
        const directoryUser = await User.findById(directory.userId);

        sendPushNotificationByComplex(
            directory.complexId,
            'RESIDENT',
            'Nuevo servicio en el directorio,',
            `${directoryUser.userName} ha agregado el número de ${newDirectory.service} al directorio.`
        );

        return newDirectory.save();
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Actualiza un directorio existente.
 * @param {string} id - El ID del directorio.
 * @param {Object} directory - El objeto del directorio.
 * @returns {Promise<Object>} - Retorna el directorio actualizado.
 * @throws {Error} - Retorna un error si ocurre algún problema.
 */
export const update = async (id, directory) => {
    try {
        return Directory.findByIdAndUpdate(id, directory, { new: true });
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Elimina un directorio.
 * @param {string} id - El ID del directorio.
 * @returns {Promise<Object>} - Retorna el directorio eliminado.
 * @throws {Error} - Retorna un error si ocurre algún problema.
 */
export const deleteDirectory = async (id) => {
    try {
        return Directory.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Obtiene todos los directorios de un complejo.
 * @param {string} complexId - El ID del complejo.
 * @returns {Promise<Array>} - Retorna una lista de directorios.
 * @throws {Error} - Retorna un error si ocurre algún problema.
 */
export const getByComplex = async (complexId) => {
    try {
        return Directory.find({ complexId });
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Obtiene todos los directorios de un usuario.
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Array>} - Retorna una lista de directorios.
 * @throws {Error} - Retorna un error si ocurre algún problema.
 */
export const getByUser = async (userId) => {
    try {
        return Directory.find({ userId });
    } catch (error) {
        throw new Error(error);
    }
};