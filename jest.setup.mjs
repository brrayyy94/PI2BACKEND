import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import {beforeAll, afterAll, jest} from '@jest/globals';

// Configuración global antes de todas las pruebas
beforeAll(async () => {
    // Mockea console.log y console.error antes de cualquier registro
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
        // Conecta a la base de datos
        const url = encodeURI(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);
        await mongoose.connect(url);
        console.log('Conexión establecida con la base de datos'); // Este mensaje será suprimido
    } catch (error) {
        // Restaura console.error para ver el mensaje de error
        jest.spyOn(console, 'error').mockRestore();
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    }
});

// Configuración global después de todas las pruebas
afterAll(async () => {
    // Cierra la conexión a la base de datos
    await mongoose.connection.close();
    console.log('Conexión a la base de datos cerrada'); // Este mensaje será suprimido
    
    // Restaura los mocks
    jest.restoreAllMocks();
});