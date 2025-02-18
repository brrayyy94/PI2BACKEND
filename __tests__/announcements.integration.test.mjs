// Mockea webpush antes de importar el servidor
jest.mock('web-push', () => ({
    setVapidDetails: jest.fn(), // Mockea la función setVapidDetails
}));

import request from 'supertest';
import { jest, describe, test, expect, afterEach } from '@jest/globals';
import app from '../server.mjs'; // Asegúrate de exportar `app` desde tu archivo principal
import * as store from '../components/announcements/store.mjs'; // Importa el módulo store para mockear sus funciones

// Mockear el módulo store
jest.mock('../components/announcements/store.mjs');

describe('Announcements Component Integration Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Limpiar mocks después de cada prueba
    });

    // Prueba para agregar un anuncio
    test('POST /announcements/add - should add a new announcement', async () => {
        const announcementData = {
            User: '1234567890abcdef12345678', // ID de usuario válido
            Title: 'Nuevo Anuncio',
            Body: 'Este es el cuerpo del anuncio',
            category: 'General',
        };

        // Mockear la función `addAnoun` del store
        store.addAnoun.mockResolvedValue(announcementData);

        const response = await request(app)
            .post('/announcements/add')
            .send(announcementData);

        expect(response.status).toBe(201);
        expect(response.body.Title).toBe('Nuevo Anuncio');

        // Verificar que se llamó a `addAnoun` con los datos correctos
        expect(store.addAnoun).toHaveBeenCalledWith(announcementData);
    });

    // Prueba para obtener anuncios por complejo
    test('GET /announcements/getByComplex/:idComplex - should get announcements by complex', async () => {
        const announcementsData = [
            {
                User: '1234567890abcdef12345678',
                Title: 'Anuncio 1',
                Body: 'Cuerpo del anuncio 1',
                category: 'General',
            },
            {
                User: '1234567890abcdef12345678',
                Title: 'Anuncio 2',
                Body: 'Cuerpo del anuncio 2',
                category: 'Mantenimiento',
            },
        ];

        const idComplex = '66c57ee8b91863b1f0bc2d32'; // ID de complejo válido

        // Mockear la función `getAnounsByComplex` para devolver la lista de anuncios
        store.getAnounsByComplex.mockResolvedValue(announcementsData);

        const response = await request(app)
            .get(`/announcements/getByComplex/${idComplex}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].Title).toBe('Anuncio 1');
        expect(response.body[1].Title).toBe('Anuncio 2');

        // Verificar que se llamó a `getAnounsByComplex` con el ID correcto
        expect(store.getAnounsByComplex).toHaveBeenCalledWith(idComplex);
    });

    // Prueba para obtener un anuncio por ID
    test('GET /announcements/getById/:_id - should get an announcement by ID', async () => {
        const announcementData = {
            _id: '1234567890abcdef12345678', // ID de anuncio válido
            User: '1234567890abcdef12345678',
            Title: 'Anuncio 1',
            Body: 'Cuerpo del anuncio 1',
            category: 'General',
        };

        // Mockear la función `getAnounById` para devolver el anuncio
        store.getAnounById.mockResolvedValue(announcementData);

        const response = await request(app)
            .get(`/announcements/getById/${announcementData._id}`);

        expect(response.status).toBe(200);
        expect(response.body.Title).toBe('Anuncio 1');

        // Verificar que se llamó a `getAnounById` con el ID correcto
        expect(store.getAnounById).toHaveBeenCalledWith(announcementData._id);
    });

    // Prueba para obtener anuncios por usuario
    test('GET /announcements/getByUser/:userId - should get announcements by user', async () => {
        const announcementsData = [
            {
                User: '1234567890abcdef12345678',
                Title: 'Anuncio 1',
                Body: 'Cuerpo del anuncio 1',
                category: 'General',
            },
            {
                User: '1234567890abcdef12345678',
                Title: 'Anuncio 2',
                Body: 'Cuerpo del anuncio 2',
                category: 'Mantenimiento',
            },
        ];

        const userId = '1234567890abcdef12345678'; // ID de usuario válido

        // Mockear la función `getAnounsByUser` para devolver la lista de anuncios
        store.getAnounsByUser.mockResolvedValue(announcementsData);

        const response = await request(app)
            .get(`/announcements/getByUser/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(response.body[0].Title).toBe('Anuncio 1');
        expect(response.body[1].Title).toBe('Anuncio 2');

        // Verificar que se llamó a `getAnounsByUser` con el ID correcto
        expect(store.getAnounsByUser).toHaveBeenCalledWith(userId);
    });

    // Prueba para buscar anuncios por palabra clave
    test('GET /announcements/search/:keyword/:idComplex - should search announcements by keyword', async () => {
        const announcementsData = [
            {
                User: '1234567890abcdef12345678',
                Title: 'Anuncio 1',
                Body: 'Cuerpo del anuncio 1',
                category: 'General',
            },
        ];

        const keyword = 'anuncio';
        const idComplex = '66c57ee8b91863b1f0bc2d32'; // ID de complejo válido

        // Mockear la función `searchAnnouncementsByKeyword` para devolver la lista de anuncios
        store.searchAnnouncementsByKeyword.mockResolvedValue(announcementsData);

        const response = await request(app)
            .get(`/announcements/search/${keyword}/${idComplex}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].Title).toBe('Anuncio 1');

        // Verificar que se llamó a `searchAnnouncementsByKeyword` con los parámetros correctos
        expect(store.searchAnnouncementsByKeyword).toHaveBeenCalledWith(keyword, idComplex);
    });
});