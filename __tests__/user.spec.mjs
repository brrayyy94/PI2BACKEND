import mongoose from 'mongoose';
import { add, get, update, remove, getById, login } from '../components/user/controller.mjs';
import { addUser, getUsersByComplex, updateUser, deleteUser, getUserById, isCorrectPassword, getUser } from '../components/user/store.mjs';

jest.mock('../components/user/store.mjs');

describe('User Controller', () => {
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
        test('should add a new user', async () => {
            req.body = {
                idDocument: '123456',
                userName: 'John Doe',
                idComplex: 'complex1',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890',
                apartment: '101',
                role: 'RESIDENT',
            };

            addUser.mockResolvedValue(req.body);

            await add(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: req.body });
        });

        test('should return an error if required fields are missing', async () => {
            req.body = {
                userName: 'John Doe',
                email: 'john.doe@example.com',
            };

            await add(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Los espacios están vacios' });
        });
    });

    describe('get', () => {
        test('should get users by complex ID', async () => {
            req.params.idComplex = 'complex1';
            const users = [{ userName: 'John Doe' }, { userName: 'Jane Doe' }];

            getUsersByComplex.mockResolvedValue(users);

            await get(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(users);
        });

        test('should return an error if complex ID is invalid', async () => {
            req.params.idComplex = 'invalid_id';

            await get(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });
    });

    describe('update', () => {
        test('should update a user', async () => {
            req.body = {
                _id: 'user1',
                idDocument: '123456',
                userName: 'John Doe',
                idComplex: 'complex1',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890',
                apartment: '101',
                role: 'RESIDENT',
            };

            updateUser.mockResolvedValue('Usuario actualizado');

            await update(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Usuario actualizado' });
        });

        test('should return an error if required fields are missing', async () => {
            req.body = {
                _id: 'user1',
                userName: 'John Doe',
            };

            await update(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
        });
    });

    describe('remove', () => {
        test('should delete a user', async () => {
            req.params.id = 'user1';

            deleteUser.mockResolvedValue({ _id: 'user1' });

            await remove(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Usuario eliminado' });
        });

        test('should return an error if user ID is invalid', async () => {
            req.params.id = 'invalid_id';

            await remove(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });
    });

    describe('getById', () => {
        test('should get a user by ID', async () => {
            req.params.idUser = 'user1';
            const user = { userName: 'John Doe' };

            getUserById.mockResolvedValue(user);

            await getById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user);
        });

        test('should return an error if user ID is invalid', async () => {
            req.params.idUser = 'invalid_id';

            await getById(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });
    });

    describe('login', () => {
        test('should login a user', async () => {
            req.body = {
                email: 'john.doe@example.com',
                password: 'password123',
            };

            isCorrectPassword.mockResolvedValue(true);
            getUser.mockResolvedValue({ userName: 'John Doe' });

            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: { userName: 'John Doe' } });
        });

        test('should return an error if email or password is missing', async () => {
            req.body = {
                email: 'john.doe@example.com',
            };

            await login(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Faltan datos' });
        });
    });
});