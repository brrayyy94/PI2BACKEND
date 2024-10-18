import Notification from "./model.mjs";
import User from "../user/model.mjs";
import { sendPushNotification } from "../../services/pushNotifications.mjs";

export const saveSubscription = async (subscription) => {
    try {
        const notification = new Notification(subscription);
        await notification.save();

        const user = await User.findById(subscription.userId);

        await sendPushNotification(subscription, '¡Hola@! ' + user.userName, '¡Ahora recibirás notificaciones!');

        return 'Usuario ' + user.userName + ' suscrito a notificaciones';
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