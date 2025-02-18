import request from 'supertest';
import { jest, describe, test, expect, afterEach } from '@jest/globals';
import bcryptjs from 'bcryptjs';
import app from '../server.mjs'; // Asegúrate de exportar `app` desde tu archivo principal
import * as store from '../components/user/store.mjs'; // Importa el módulo store para mockear sus funciones

// Mockear el módulo store
jest.mock('../components/user/store.mjs');

describe('User Component Integration Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpiar mocks después de cada prueba
    });

    // Prueba para agregar un usuario
    test('POST /user/add - should add a new user', async () => {
        const userData = {
            idDocument: '123456',
            userName: 'John Doe',
            idComplex: 'complex1',
            email: 'john.doe@example.com',
            password: 'password123',
            phone: '1234567890',
            apartment: '101',
            role: 'RESIDENT',
        };

        // Mockear la función `addUser` del store
        store.addUser.mockResolvedValue(userData);

        const response = await request(app)
            .post('/user/add')
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body.userName).toBe('John Doe');

        // Verificar que se llamó a `addUser` con los datos correctos
        expect(store.addUser).toHaveBeenCalledWith(userData);
    });

    // Prueba para el login exitoso
    test('POST /user/login - should login successfully', async () => {
        const userData = {
            idDocument: '123456',
            userName: 'John Doe',
            idComplex: 'complex1',
            email: 'john.doe@example.com',
            password: await bcryptjs.hash('password123', 10), // Encriptar la contraseña
            phone: '1234567890',
            apartment: '101',
            role: 'RESIDENT',
        };

        // Mockear la función `isCorrectPassword` para devolver `true`
        store.isCorrectPassword.mockResolvedValue(true);

        // Mockear la función `getUser` para devolver los datos del usuario
        store.getUser.mockResolvedValue(userData);

        const loginData = {
            email: 'john.doe@example.com',
            password: 'password123',
        };

        const response = await request(app)
            .post('/user/login')
            .send(loginData);

        expect(response.status).toBe(200);
        expect(response.body.userName).toBe('John Doe');

        // Verificar que se llamó a `isCorrectPassword` y `getUser` con los datos correctos
        expect(store.isCorrectPassword).toHaveBeenCalledWith(loginData.email, loginData.password);
        expect(store.getUser).toHaveBeenCalledWith(loginData.email);
    });

    // Prueba para el login fallido
    test('POST /user/login - should fail login with wrong password', async () => {
        const userData = {
            idDocument: '123456',
            userName: 'John Doe',
            idComplex: 'complex1',
            email: 'john.doe@example.com',
            password: await bcryptjs.hash('password123', 10), // Encriptar la contraseña
            phone: '1234567890',
            apartment: '101',
            role: 'RESIDENT',
        };

        // Mockear la función `isCorrectPassword` para devolver `false`
        store.isCorrectPassword.mockResolvedValue(false);

        // Mockear la función `getUser` para devolver los datos del usuario
        store.getUser.mockResolvedValue(userData);

        const loginData = {
            email: 'john.doe@example.com',
            password: 'wrongpassword', // Contraseña incorrecta
        };

        const response = await request(app)
            .post('/user/login')
            .send(loginData);

        expect(response.status).toBe(400);
        expect(response.body.body).toBe('Credenciales incorrectas');

        // Verificar que se llamó a `isCorrectPassword` con los datos correctos
        expect(store.isCorrectPassword).toHaveBeenCalledWith(loginData.email, loginData.password);
    });

    // Prueba para obtener usuarios por complejo
    test('GET /user/getByComplex/:idComplex - should get users by complex', async () => {
        const usersData = [
            {
                idDocument: '123456',
                userName: 'John Doe',
                idComplex: '66c57ee8b91863b1f0bc2d32',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890',
                apartment: '101',
                role: 'RESIDENT',
            },
            {
                idDocument: '654321',
                userName: 'Jane Doe',
                idComplex: '66c57ee8b91863b1f0bc2d32',
                email: 'jane.doe@example.com',
                password: 'password123',
                phone: '0987654321',
                apartment: '102',
                role: 'RESIDENT',
            },
        ];

        // Mockear la función `getUsersByComplex` para devolver la lista de usuarios
        store.getUsersByComplex.mockResolvedValue(usersData);

        const response = await request(app)
            .get('/user/getByComplex/66c57ee8b91863b1f0bc2d32');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].userName).toBe('John Doe');
        expect(response.body[1].userName).toBe('Jane Doe');

        // Verificar que se llamó a `getUsersByComplex` con el ID correcto
        expect(store.getUsersByComplex).toHaveBeenCalledWith('66c57ee8b91863b1f0bc2d32');
    });
});