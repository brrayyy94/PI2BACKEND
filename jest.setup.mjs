import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import {beforeAll, afterAll, jest} from '@jest/globals';

// Configuración global antes de todas las pruebas
beforeAll(async () => {
    // Mockea console.log y console.error antes de cualquier registro
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Conecta a la base de datos
    const url = encodeURI(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);
    await mongoose.connect(url);
 
});

// Configuración global después de todas las pruebas
afterAll(async () => {
    // Cierra la conexión a la base de datos
    await mongoose.connection.close();
    console.log('Conexión a la base de datos cerrada'); // Este mensaje será suprimido
    
    // Restaura los mocks
    jest.restoreAllMocks();
});