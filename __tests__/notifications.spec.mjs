import { subscribe, testOne, unsubscribe } from '../components/notifications/controller.mjs';
import { saveSubscription, getSubscription, deleteSubscription } from '../components/notifications/store.mjs';
import { sendPushNotification } from '../../services/pushNotifications.mjs';
import mongoose from 'mongoose';

jest.mock('../components/notifications/store.mjs');
jest.mock('../../services/pushNotifications.mjs');

describe('Notifications Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('subscribe', () => {
        test('should subscribe a user', async () => {
            req.body = {
                endpoint: 'https://example.com',
                expirationTime: null,
                keys: {
                    p256dh: 'p256dh_key',
                    auth: 'auth_key',
                },
                userId: 'user1',
                userComplex: 'complex1',
                userName: 'John Doe',
                userRole: 'RESIDENT',
            };

            const subscription = { ...req.body };
            saveSubscription.mockResolvedValue(subscription);

            await subscribe(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(subscription);
        });

        test('should return an error if required fields are missing', async () => {
            req.body = {
                endpoint: 'https://example.com',
                keys: {
                    p256dh: 'p256dh_key',
                    auth: 'auth_key',
                },
            };

            await subscribe(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
        });

        test('should return an error if ID format is invalid', async () => {
            req.body = {
                endpoint: 'https://example.com',
                expirationTime: null,
                keys: {
                    p256dh: 'p256dh_key',
                    auth: 'auth_key',
                },
                userId: 'invalid_id',
                userComplex: 'invalid_id',
                userName: 'John Doe',
                userRole: 'RESIDENT',
            };

            await subscribe(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });
    });

    describe('testOne', () => {
        test('should send a push notification', async () => {
            req.params.userId = 'user1';
            req.body = {
                title: 'Test Notification',
                body: 'This is a test notification',
            };

            const subscription = {
                endpoint: 'https://example.com',
                keys: {
                    p256dh: 'p256dh_key',
                    auth: 'auth_key',
                },
                userId: 'user1',
            };

            getSubscription.mockResolvedValue(subscription);
            sendPushNotification.mockResolvedValue(true);

            await testOne(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('Resultado: usuario user1 notificado');
        });

        test('should return an error if user ID is invalid', async () => {
            req.params.userId = 'invalid_id';

            await testOne(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });

        test('should return an error if subscription is not found', async () => {
            req.params.userId = 'user1';

            getSubscription.mockResolvedValue(null);

            await testOne(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Subscription not found' });
        });

        test('should return an error if push notification fails', async () => {
            req.params.userId = 'user1';
            req.body = {
                title: 'Test Notification',
                body: 'This is a test notification',
            };

            const subscription = {
                endpoint: 'https://example.com',
                keys: {
                    p256dh: 'p256dh_key',
                    auth: 'auth_key',
                },
                userId: 'user1',
            };

            getSubscription.mockResolvedValue(subscription);
            sendPushNotification.mockResolvedValue(false);

            await testOne(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Error al enviar la notificación' });
        });
    });

    describe('unsubscribe', () => {
        test('should unsubscribe a user', async () => {
            req.params.userId = 'user1';

            const deletedSubscription = { userId: 'user1' };
            deleteSubscription.mockResolvedValue(deletedSubscription);

            await unsubscribe(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('Usuario user1 desuscrito');
        });

        test('should return an error if user ID is invalid', async () => {
            req.params.userId = 'invalid_id';

            await unsubscribe(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });
    });
});