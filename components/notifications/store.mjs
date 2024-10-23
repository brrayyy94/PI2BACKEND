import Notification from "./model.mjs";
import { sendPushNotification } from "../../services/pushNotifications.mjs";

/**
 * Guarda o actualiza una suscripción de notificaciones.
 * @param {Object} subscription - La suscripción del usuario.
 * @returns {Promise<string>} - Retorna un mensaje indicando que el usuario se ha suscrito a las notificaciones.
 * @throws {Object} - Retorna un objeto de error con el estado y el mensaje.
 */
export const saveSubscription = async (subscription) => {
    try {
        await Notification.findOneAndUpdate(
            { userId: subscription.userId },
            subscription,
            { new: true, upsert: true }
        );

        await sendPushNotification(subscription, '¡Hola ' + subscription.userName + '! ', 'Ahora recibirás notificaciones en este dispositivo');

        return 'Usuario ' + subscription.userName + ' suscrito a notificaciones';
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

/**
 * Obtiene una suscripción de notificaciones por ID de usuario.
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Object|null>} - Retorna la suscripción del usuario o null si no se encuentra.
 * @throws {Object} - Retorna un objeto de error con el estado y el mensaje.
 */
export const getSubscription = async (userId) => {
    try {
        return await Notification.findOne({ userId: userId });
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

/**
 * Elimina una suscripción de notificaciones por ID de usuario.
 * @param {string} userId - El ID del usuario.
 * @returns {Promise<Object|null>} - Retorna la suscripción eliminada del usuario o null si no se encuentra.
 * @throws {Object} - Retorna un objeto de error con el estado y el mensaje.
 */
export const deleteSubscription = async (userId) => {
    try {
        return await Notification.findOneAndDelete({ userId });
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

/**
 * Obtener todas las suscripciones por ID de complejo
 * @param {string} complexId - El ID del complejo
 * @returns {Promise<Array>} - Retorna una promesa que resuelve con un arreglo de suscripciones
 * @throws {Object} - Retorna un objeto de error con el estado y el mensaje
 */
export const getSubscriptionsByComplex = async (complexId) => {
    try {
        return await Notification.find({ userComplex: complexId });
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};