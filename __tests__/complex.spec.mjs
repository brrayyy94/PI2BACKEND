import { add, get, getConfigColors, update, remove, updateColors, addZone, getZone, updateZone, deleteZone, getZones } from '../components/complex/controller.mjs';
import { addComplex, getComplex, updateComplex, deleteComplex, getComplexColors, updateComplexColors, addComplexZone, getComplexZone, updateComplexZone, deleteComplexZone } from '../components/complex/store.mjs';
import mongoose from 'mongoose';

jest.mock('../components/complex/store.mjs');

describe('Complex Controller', () => {
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
        test('should add a new complex', async () => {
            req.body = {
                name: 'Complex 1',
                address: '123 Main St',
                config: {
                    primaryColor: '#FFFFFF',
                    secondaryColor: '#000000',
                },
            };

            const complex = { ...req.body };
            addComplex.mockResolvedValue(complex);

            await add(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(complex);
        });

        test('should return an error if required fields are missing', async () => {
            req.body = {
                name: 'Complex 1',
                address: '123 Main St',
            };

            await add(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
        });

        test('should return an error if fields contain only whitespace', async () => {
            req.body = {
                name: '   ',
                address: '   ',
                config: {
                    primaryColor: '   ',
                    secondaryColor: '   ',
                },
            };

            await add(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Fields cannot be empty or contain only whitespace' });
        });
    });

    describe('get', () => {
        test('should get a complex by ID', async () => {
            req.params.idComplex = 'complex1';
            const complex = { name: 'Complex 1', address: '123 Main St' };

            getComplex.mockResolvedValue(complex);

            await get(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(complex);
        });

        test('should return an error if ID is invalid', async () => {
            req.params.idComplex = 'invalid_id';

            await get(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });

        test('should return an error if complex is not found', async () => {
            req.params.idComplex = 'complex1';

            getComplex.mockResolvedValue(null);

            await get(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Conjunto no encontrado' });
        });
    });

    describe('getConfigColors', () => {
        test('should get complex colors by ID', async () => {
            req.params.idComplex = 'complex1';
            const colors = { primaryColor: '#FFFFFF', secondaryColor: '#000000' };

            getComplexColors.mockResolvedValue(colors);

            await getConfigColors(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(colors);
        });

        test('should return an error if ID is invalid', async () => {
            req.params.idComplex = 'invalid_id';

            await getConfigColors(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });

        test('should return an error if complex is not found', async () => {
            req.params.idComplex = 'complex1';

            getComplexColors.mockResolvedValue(null);

            await getConfigColors(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Conjunto no encontrado' });
        });
    });

    describe('update', () => {
        test('should update a complex', async () => {
            req.body = {
                _id: 'complex1',
                name: 'Complex 1',
                address: '123 Main St',
                config: {
                    primaryColor: '#FFFFFF',
                    secondaryColor: '#000000',
                },
            };

            updateComplex.mockResolvedValue('Conjunto actualizado');

            await update(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Conjunto actualizado' });
        });

        test('should return an error if required fields are missing', async () => {
            req.body = {
                _id: 'complex1',
                name: 'Complex 1',
            };

            await update(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
        });

        test('should return an error if fields contain only whitespace', async () => {
            req.body = {
                _id: 'complex1',
                name: '   ',
                address: '   ',
                config: {
                    primaryColor: '   ',
                    secondaryColor: '   ',
                },
            };

            await update(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Fields cannot be empty or contain only whitespace' });
        });
    });

    describe('updateColors', () => {
        test('should update complex colors', async () => {
            req.params.idComplex = 'complex1';
            req.body = {
                primaryColor: '#FFFFFF',
                secondaryColor: '#000000',
            };

            const complex = { primaryColor: '#FFFFFF', secondaryColor: '#000000' };
            updateComplexColors.mockResolvedValue(complex);

            await updateColors(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(complex);
        });

        test('should return an error if required fields are missing', async () => {
            req.params.idComplex = 'complex1';
            req.body = {};

            await updateColors(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Both primaryColor and secondaryColor are required' });
        });

        test('should return an error if complex is not found', async () => {
            req.params.idComplex = 'complex1';
            req.body = {
                primaryColor: '#FFFFFF',
                secondaryColor: '#000000',
            };

            updateComplexColors.mockResolvedValue(null);

            await updateColors(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Complex not found' });
        });
    });

    describe('remove', () => {
        test('should delete a complex', async () => {
            req.params.id = 'complex1';

            deleteComplex.mockResolvedValue({ _id: 'complex1' });

            await remove(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Conjunto eliminado' });
        });

        test('should return an error if ID is invalid', async () => {
            req.params.id = 'invalid_id';

            await remove(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });

        test('should return an error if complex is not found', async () => {
            req.params.id = 'complex1';

            deleteComplex.mockResolvedValue(null);

            await remove(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Conjunto no encontrado' });
        });
    });

    describe('addZone', () => {
        test('should add a new zone to a complex', async () => {
            req.params.idComplex = 'complex1';
            req.body = {
                name: 'Zone 1',
                availableDays: ['Monday', 'Tuesday'],
                availableHours: {
                    start: '08:00',
                    end: '18:00',
                },
            };

            const zone = { ...req.body, complex: 'complex1' };
            addComplexZone.mockResolvedValue({ zones: [zone] });

            await addZone(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: zone });
        });

        test('should return an error if required fields are missing', async () => {
            req.params.idComplex = 'complex1';
            req.body = {
                name: 'Zone 1',
            };

            await addZone(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
        });

        test('should return an error if start time is after end time', async () => {
            req.params.idComplex = 'complex1';
            req.body = {
                name: 'Zone 1',
                availableDays: ['Monday', 'Tuesday'],
                availableHours: {
                    start: '18:00',
                    end: '08:00',
                },
            };

            await addZone(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Start time must be before end time' });
        });

        test('should return an error if complex ID is invalid', async () => {
            req.params.idComplex = 'invalid_id';
            req.body = {
                name: 'Zone 1',
                availableDays: ['Monday', 'Tuesday'],
                availableHours: {
                    start: '08:00',
                    end: '18:00',
                },
            };

            await addZone(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid complex ID format' });
        });
    });

    describe('getZone', () => {
        test('should get a zone by ID', async () => {
            req.params.idComplex = 'complex1';
            req.params.idZone = 'zone1';
            const zone = { name: 'Zone 1' };

            getComplexZone.mockResolvedValue(zone);

            await getZone(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(zone);
        });

        test('should return an error if ID is invalid', async () => {
            req.params.idComplex = 'invalid_id';
            req.params.idZone = 'zone1';

            await getZone(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });

        test('should return an error if zone is not found', async () => {
            req.params.idComplex = 'complex1';
            req.params.idZone = 'zone1';

            getComplexZone.mockResolvedValue(null);

            await getZone(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Zone not found' });
        });
    });

    describe('updateZone', () => {
        test('should update a zone', async () => {
            req.params.idComplex = 'complex1';
            req.params.idZone = 'zone1';
            req.body = {
                name: 'Zone 1',
                availableDays: ['Monday', 'Tuesday'],
                availableHours: {
                    start: '08:00',
                    end: '18:00',
                },
            };

            const zone = { ...req.body, _id: 'zone1' };
            updateComplexZone.mockResolvedValue({ zones: [zone] });

            await updateZone(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(zone);
        });

        test('should return an error if required fields are missing', async () => {
            req.params.idComplex = 'complex1';
            req.params.idZone = 'zone1';
            req.body = {};

            await updateZone(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Missing required fields' });
        });

        test('should return an error if start time is after end time', async () => {
            req.params.idComplex = 'complex1';
            req.params.idZone = 'zone1';
            req.body = {
                availableHours: {
                    start: '18:00',
                    end: '08:00',
                },
            };

            await updateZone(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Start time must be before end time' });
        });

        test('should return an error if ID is invalid', async () => {
            req.params.idComplex = 'invalid_id';
            req.params.idZone = 'zone1';
            req.body = {
                name: 'Zone 1',
                availableDays: ['Monday', 'Tuesday'],
                availableHours: {
                    start: '08:00',
                    end: '18:00',
                },
            };

            await updateZone(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });
    });

    describe('deleteZone', () => {
        test('should delete a zone', async () => {
            req.params.idZone = 'zone1';

            deleteComplexZone.mockResolvedValue({ _id: 'zone1' });

            await deleteZone(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Zone deleted' });
        });

        test('should return an error if ID is invalid', async () => {
            req.params.idZone = 'invalid_id';

            await deleteZone(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });

        test('should return an error if zone is not found', async () => {
            req.params.idZone = 'zone1';

            deleteComplexZone.mockResolvedValue(null);

            await deleteZone(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Zone not found' });
        });
    });

    describe('getZones', () => {
        test('should get all zones for a complex', async () => {
            req.params.idComplex = 'complex1';
            const zones = [{ name: 'Zone 1' }, { name: 'Zone 2' }];

            getComplex.mockResolvedValue({ zones });

            await getZones(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(zones);
        });

        test('should return an error if ID is invalid', async () => {
            req.params.idComplex = 'invalid_id';

            await getZones(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
        });
    });
});