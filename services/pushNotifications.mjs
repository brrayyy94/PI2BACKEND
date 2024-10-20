import webpush from "web-push";
import { getSubscription, getSubscriptionsByComplex } from "../components/notifications/store.mjs";

/**
 * Enviar notificaciones push por suscripción
 * @param {Object} subscription - La suscripción del usuario
 * @param {string} title - El título de la notificación
 * @param {string} body - El cuerpo de la notificación
 * @returns {Promise<boolean>} - Retorna true si la notificación se envió correctamente, false en caso contrario
 */
export const sendPushNotification = async (subscription, title, body) => {
    try {
        const userSubscription = {
            endpoint: subscription.endpoint,
            expirationTime: subscription.expirationTime,
            keys: subscription.keys
        };

        const payload = JSON.stringify({
            title,
            body
        });

        await webpush.sendNotification(userSubscription, payload);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Enviar notificaciones push por usuario
 * @param {string} userId - El ID del usuario
 * @param {string} title - El título de la notificación
 * @param {string} body - El cuerpo de la notificación
 * @returns {Promise<boolean>} - Retorna true si la notificación se envió correctamente, false en caso contrario
 */
export const sendPushNotificationByUser = async (userId, title, body) => {
    try {
        const subscription = await getSubscription(userId);

        if (!subscription) {
            return false;
        }

        await sendPushNotification(subscription, title, body);
        return true;
    } catch (error) {
        return false;
    }
};

/**
 * Enviar notificaciones push por unidad
 * @param {string} complexId - El ID del complejo
 * @param {'ALL' | 'RESIDENT' | 'ADMIN'} type - El tipo de destinatarios ('ALL', 'RESIDENT', 'ADMIN')
 * @param {string} title - El título de la notificación
 * @param {string} body - El cuerpo de la notificación
 * @returns {Promise<boolean>} - Retorna true si las notificaciones se enviaron correctamente, false en caso contrario
 */
export const sendPushNotificationByComplex = async (complexId, type, title, body) => {
    try {
        const subscriptions = await getSubscriptionsByComplex(complexId);

        if (!subscriptions || subscriptions.length === 0) {
            return false;
        }

        const sendNotifications = async (subscriptions) => {
            for (const subscription of subscriptions) {
                try {
                    await sendPushNotification(subscription, title, body);
                } catch (error) {
                    console.error(`Failed to send notification to ${subscription.userId}: ${error.message}`);
                }
            }
        };

        if (type === 'ALL') {
            await sendNotifications(subscriptions);
        } else if (type === 'RESIDENT') {
            // Filtrar suscripciones para excluir a los administradores
            const residentSubscriptions = subscriptions.filter(s => s.userRole !== 'ADMIN');
            await sendNotifications(residentSubscriptions);
        } else if (type === 'ADMIN') {
            // Filtrar suscripciones para excluir a los residentes
            const adminSubscriptions = subscriptions.filter(s => s.userRole === 'ADMIN');
            await sendNotifications(adminSubscriptions);
        } else {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};