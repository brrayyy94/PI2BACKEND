import { validateAnuncio, add, getByComplex, update, remove } from '../components/anouncements/controller.mjs';
import { addAnoun, getAnounsByComplex, updateAnoun, deleteAnoun } from '../components/anouncements/store.mjs';
import mongoose from 'mongoose';

jest.mock('../components/anouncements/store.mjs', () => ({
    addAnoun: jest.fn(),
    getAnounsByComplex: jest.fn(),
    updateAnoun: jest.fn(),
    deleteAnoun: jest.fn(),
}));

jest.mock('../components/anouncements/controller.mjs', () => ({
    validateAnuncio: jest.fn(),
    add: jest.requireActual('../components/anouncements/controller.mjs').add,
    getByComplex: jest.requireActual('../components/anouncements/controller.mjs').getByComplex,
    update: jest.requireActual('../components/anouncements/controller.mjs').update,
    remove: jest.requireActual('../components/anouncements/controller.mjs').remove,
}));

describe('Announcements Controller', () => {
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

        // Mock mongoose.Types.ObjectId.isValid to always return true
        jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('add', () => {
        test('should add a new announcement', async () => {
            req.body = {
                title: 'Announcement 1',
                content: 'This is the content of announcement 1',
                date: '2023-10-01',
            };

            const announcement = { ...req.body };
            addAnoun.mockResolvedValue(announcement);

            const result = await add(req, res);
            expect(result.status).toBe(201);
            expect(result.message).toEqual(announcement);
        });

        test('should return an error if required fields are missing', async () => {
            req.body = {
                title: 'Announcement 1',
            };
        
            const error = new Error('All fields are required');
            error.status = 400;
        
            // Hacemos que `validateAnuncio` simule lanzar el error
            validateAnuncio.mockImplementation(() => {
                throw error;
            });
        
            // Llamamos a la función `add` directamente y verificamos el objeto devuelto
            const result = await add(req, res);
            
            // Verificamos que el estado sea 400
            expect(result.status).toBe(400);
            // Verificamos que el mensaje sea el esperado
            expect(result.message).toBe('Error creating announcement: All fields are required');
        });        
    });

    describe('getByComplex', () => {
        test('should get all announcements by complex ID', async () => {
            req.params.idComplex = 'complex1';
            const announcements = [
                { title: 'Announcement 1', content: 'Content 1', date: '2023-10-01' },
                { title: 'Announcement 2', content: 'Content 2', date: '2023-10-02' },
            ];

            getAnounsByComplex.mockResolvedValue(announcements);

            const result = await getByComplex(req, res);
            expect(result.status).toBe(200);
            expect(result.message).toEqual(announcements);
        });

        test('should return an error if complex ID is invalid', async () => {
            req.params.idComplex = 'invalid_id';

            // Mock mongoose.Types.ObjectId.isValid to return false for invalid_id
            mongoose.Types.ObjectId.isValid.mockReturnValueOnce(false);

            const result = await getByComplex(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Invalid ID format');
        });
    });

    describe('update', () => {
        test('should update an announcement', async () => {
            req.params.idUser = 'user1';
            req.body = {
                _id: 'announcement1',
                title: 'Updated Announcement 1',
                content: 'Updated content of announcement 1',
                date: '2023-10-01',
            };

            updateAnoun.mockResolvedValue('Announcement updated');

            const result = await update(req, res);
            expect(result.status).toBe(201);
            expect(result.message).toBe('Anuncio actualizado');
            expect(result.data).toBe('Announcement updated');
        });

        test('should return an error if required fields are missing', async () => {
            req.params.idUser = 'user1';
            req.body = {
                _id: 'announcement1',
                title: 'Updated Announcement 1',
            };

            const result = await update(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('All fields are required');
        });
    });

    describe('remove', () => {
        test('should delete an announcement', async () => {
            req.params.idAnoun = 'announcement1';
            req.params.userId = 'user1';

            deleteAnoun.mockResolvedValue({ acknowledged: true, deletedCount: 1 });

            const result = await remove(req, res);
            expect(result.status).toBe(200);
            expect(result.message).toBe('Announcement deleted');
        });

        test('should return an error if announcement ID is invalid', async () => {
            req.params.idAnoun = 'invalid_id';
            req.params.userId = 'user1';

            // Mock mongoose.Types.ObjectId.isValid to return false for invalid_id
            mongoose.Types.ObjectId.isValid.mockReturnValueOnce(false);

            const result = await remove(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Invalid ID format');
        });
    });
});