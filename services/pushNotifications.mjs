import webpush from "web-push";
import { getSubscription, getSubscriptionsByComplex } from "../components/notifications/store.mjs";

// Enviar notificaciones push por suscripción
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

// enviar notificaciones push por usuario
export const sendPushNotificationByUser = async (userId, title, body) => {
    try {
        const subscription = await getSubscription(userId);

        await sendPushNotification(subscription, title, body);
        return true;
    } catch (error) {
        return false;
    }
};

// enviar notificaciones push por unidad
export const sendPushNotificationByComplex = async (complexId, title, body) => {
    try {
        const subscriptions = await getSubscriptionsByComplex(complexId);

        for (const subscription of subscriptions) {
            await sendPushNotification(subscription, title, body);
        }

        return true;
    } catch (error) {
        return false;
    }
};