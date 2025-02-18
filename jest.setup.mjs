import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, afterAll } from '@jest/globals';

let mongoServer;

beforeAll(async () => {
    // Inicia la base de datos en memoria
    mongoServer = await MongoMemoryServer.create();

    // Obtiene la URI de la base de datos en memoria
    const uri = mongoServer.getUri();

    // Asigna la URI a la variable global __MONGO_URI__
    global.__MONGO_URI__ = uri;

    // Conecta Mongoose a la base de datos en memoria
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    // Desconecta Mongoose y detiene la base de datos en memoria
    await mongoose.disconnect();
    await mongoServer.stop();
});