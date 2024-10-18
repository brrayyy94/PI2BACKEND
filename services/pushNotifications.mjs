import webpush from "web-push";

export const sendPushNotification = async (subscription, title, body) => {
    try {
        const userSubscription = {
            endpoint: subscription.endpoint,
            expirationTime: subscription.expirationTime,
            keys: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth
            }
        }

        console.log(userSubscription)
        const payload = JSON.stringify({
            title,
            body
        });

        await webpush.sendNotification(userSubscription, payload);
        return true;
    } catch (error) {
        throw new Error('Failed to send notification: ' + error.message);
    }
};