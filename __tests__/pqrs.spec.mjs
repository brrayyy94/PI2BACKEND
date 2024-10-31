import { add, answer, get, getByUser, close, pqrsAnswers, notify, reopen, notifyOne } from '../components/pqrs/controller.mjs';
import { createPqrs, addAnswer, getPqrsByUser, getPqrsByComplex, closePqrs, reopenPqrs, getPqrsAnswers, notifyPqrs, notifyOnePqrs } from '../components/pqrs/store.mjs';
import User from '../components/user/model.mjs';
import mongoose from 'mongoose';

jest.mock('../components/pqrs/store.mjs');
jest.mock('../components/user/model.mjs');

describe('PQRS Controller', () => {
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

    describe('add', () => {
        test('should add a new PQRS', async () => {
            req.body = {
                user: 'user1',
                case: 'case1',
                description: 'description1',
                category: 'category1',
            };

            const userData = { _id: 'user1', userName: 'John Doe', idComplex: 'complex1' };
            User.findById.mockResolvedValue(userData);
            createPqrs.mockResolvedValue(req.body);

            await add(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "PQRS created successfully", data: req.body });
        });

        test('should return an error if required fields are missing', async () => {
            req.body = {
                case: 'case1',
                description: 'description1',
            };

            await add(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Los espacios están vacios" });
        });
    });

    describe('get', () => {
        test('should get PQRS entries by complex ID', async () => {
            req.params.idComplex = 'complex1';
            const pqrsEntries = [{ case: 'case1' }, { case: 'case2' }];

            Pqrs.find.mockResolvedValue(pqrsEntries);

            await get(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(pqrsEntries);
        });

        test('should return an error if complex ID is invalid', async () => {
            req.params.idComplex = 'invalid_id';

            await get(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid complex ID' });
        });
    });

    describe('getByUser', () => {
        test('should get PQRS entries by user ID', async () => {
            req.params.idUser = 'user1';
            const pqrsEntries = [{ case: 'case1' }, { case: 'case2' }];

            getPqrsByUser.mockResolvedValue(pqrsEntries);

            await getByUser(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(pqrsEntries);
        });

        test('should return an error if user ID is invalid', async () => {
            req.params.idUser = 'invalid_id';

            await getByUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid user ID' });
        });
    });

    describe('answer', () => {
        test('should add an answer to a PQRS', async () => {
            req.params.id = 'pqrs1';
            req.body = {
                userId: 'user1',
                answer: 'This is an answer',
            };

            const userData = { _id: 'user1', role: 'ADMIN' };
            const pqrsData = { _id: 'pqrs1', answer: [], state: 'pendiente' };

            User.findById.mockResolvedValue(userData);
            Pqrs.findById.mockResolvedValue(pqrsData);

            await answer(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Answer added successfully", data: pqrsData });
        });

        test('should return an error if PQRS ID is invalid', async () => {
            req.params.id = 'invalid_id';

            await answer(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Invalid PQRS ID" });
        });
    });

    describe('close', () => {
        test('should close a PQRS', async () => {
            req.params.id = 'pqrs1';
            const pqrsData = { _id: 'pqrs1', state: 'closed' };

            closePqrs.mockResolvedValue(pqrsData);

            await close(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(pqrsData);
        });

        test('should return an error if PQRS ID is invalid', async () => {
            req.params.id = 'invalid_id';

            await close(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid PQRS ID' });
        });
    });

    describe('reopen', () => {
        test('should reopen a PQRS', async () => {
            req.params.id = 'pqrs1';
            const pqrsData = { _id: 'pqrs1', state: 'reopened' };

            reopenPqrs.mockResolvedValue(pqrsData);

            await reopen(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(pqrsData);
        });

        test('should return an error if PQRS ID is invalid', async () => {
            req.params.id = 'invalid_id';

            await reopen(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid PQRS ID' });
        });
    });

    describe('notify', () => {
        test('should notify a user', async () => {
            req.params.idUser = 'user1';

            await notify(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'The notification has been sent' });
        });

        test('should return an error if user ID is invalid', async () => {
            req.params.idUser = 'invalid_id';

            await notify(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid User Id' });
        });
    });

    describe('notifyOne', () => {
        test('should notify a user for a specific PQRS', async () => {
            req.params.idUser = 'user1';
            req.params.idPqrs = 'pqrs1';

            await notifyOne(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'The notification has been sent' });
        });

        test('should return an error if user ID is invalid', async () => {
            req.params.idUser = 'invalid_id';
            req.params.idPqrs = 'pqrs1';

            await notifyOne(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid User Id' });
        });

        test('should return an error if PQRS ID is invalid', async () => {
            req.params.idUser = 'user1';
            req.params.idPqrs = 'invalid_id';

            await notifyOne(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid User Id' });
        });
    });
});