import Notification from "./model.mjs";
import { sendPushNotification } from "../../services/pushNotifications.mjs";

export const saveSubscription = async (subscription) => {
    try {
        await Notification.findOneAndUpdate(
            { userId: subscription.userId },
            subscription,
            { new: true, upsert: true }
        );

        await sendPushNotification(subscription, '¡Hola@! ' + subscription.userName, '¡Ahora recibirás notificaciones en este dispositivo!');

        return 'Usuario ' + subscription.userName + ' suscrito a notificaciones';
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

export const getSubscription = async (userId) => {
    try {
        return await Notification.findOne({ userId });
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

export const deleteSubscription = async (userId) => {
    try {
        return await Notification.findOneAndDelete({ userId });
    } catch (error) {
        throw { status: 400, message: error.message };
    }
}

export const getSubscriptionsByComplex = async (complexId) => {
    try {
        return await Notification.find({ userComplex: complexId });
    } catch (error) {
        throw { status: 400, message: error.message };
    }
}