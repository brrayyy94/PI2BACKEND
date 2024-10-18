import { saveSubscription, getSubscription, deleteSubscription } from './store.mjs';
import mongoose from "mongoose";
import { sendPushNotification } from "../../services/pushNotifications.mjs";

const subscribe = async (req, res) => {
    const { endpoint, expirationTime, keys, userId, userComplex } = req.body;

    if (!endpoint || !keys || !keys.p256dh || !keys.auth || !userId || !userComplex) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(userComplex)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const subscription = {
            endpoint,
            expirationTime,
            keys,
            userId,
            userComplex,
        };

        const savedSubscription = await saveSubscription(subscription);

        return res.status(201).json(savedSubscription);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const testOne = async (req, res) => {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const subscription = await getSubscription(userId);

        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }

        await sendPushNotification(subscription, '¡Exito!', '¡Notificación de prueba enviada!');

        return res.status(200).json('Resultado: ' + 'usuario ' + subscription.userId + ' notificado');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

};

const unsubscribe = async (req, res) => {
    const { userId } = req.params;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const deletedSubscription = await deleteSubscription(userId);

        return res.status(200).json('Usuario ' + deletedSubscription.userId + ' desuscrito');
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export { subscribe, testOne, unsubscribe };