import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, afterAll, afterEach } from '@jest/globals';

let mongoServer;

beforeAll(async () => {
    // Inicia una instancia de MongoDB en memoria
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Conecta mongoose a la base de datos en memoria
    await mongoose.connect(uri);
});

afterAll(async () => {
    // Cierra la conexión y detén la base de datos en memoria
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    // Limpia la base de datos después de cada prueba
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});