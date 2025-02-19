import {beforeAll, afterAll, jest} from '@jest/globals';
import mongoose from 'mongoose';

jest.mock('mongoose', () => ({
    connect: jest.fn().mockResolvedValue(true),
    connection: {
        close: jest.fn().mockResolvedValue(true),
    },
}));

beforeAll(async () => {
    // Mockea console.log y console.error antes de cualquier registro
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    // Mockea la conexión a la base de datos
    await mongoose.connect('mock-url');
});

afterAll(async () => {
    // Mockea el cierre de la conexión
    await mongoose.connection.close();
});