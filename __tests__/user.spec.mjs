import { jest, describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import { add, get, update, remove, getById, login, addPet, updatePet, removePet, addVehicle, updateVehicle, removeVehicle } from '../components/user/controller.mjs';
import { addUser, updateUser, addUserPet, addUserVehicle, isCorrectPassword, getUser, deleteUserPet, deleteUserVehicle, updateUserPet, updateUserVehicle } from '../components/user/store.mjs';
//agregando algo 

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

            const result = await add(req, res);
            expect(result.status).toBe(201);
            expect(result.message).toEqual(req.body);
        });

        test('should return an error if required fields are missing', async () => {
            req.body = {
                userName: 'John Doe',
                email: 'john.doe@example.com',
            };

            const result = await add(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Los espacios están vacios');
        });
    });

    describe('get', () => {
        test('should return an error if complex ID is invalid', async () => {
            req.params.idComplex = 'invalid_id';

            const result = await get(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Invalid ID format');
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

            const result = await update(req, res);
            return result;
        });
    });

    describe('remove', () => {
        test('should return an error if user ID is invalid', async () => {
            req.params.id = 'invalid_id';

            const result = await remove(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Invalid ID format');
        });
    });

    describe('getById', () => {
        test('should return an error if user ID is invalid', async () => {
            req.params.idUser = 'invalid_id';

            const result = await getById(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Invalid ID format');
        });
    });

    describe('login', () => {
        test('should return 400 if email or password is missing', async () => {
            req.body = {}; // Sin email ni password
            const result = await login(req);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Faltan datos');
        });
    
        test('should return 200 and user data if login is successful', async () => {
            req.body = { email: 'test@example.com', password: 'password123' };
            isCorrectPassword.mockResolvedValue(true);
            getUser.mockResolvedValue({ userName: 'John Doe', email: 'test@example.com' });
    
            const result = await login(req);
            expect(result.status).toBe(200);
            expect(result.message.userName).toBe('John Doe');
        });
    
        test('should return 400 if authentication fails', async () => {
            req.body = { email: 'test@example.com', password: 'wrongpassword' };
            isCorrectPassword.mockResolvedValue(false); // Simula que la autenticación falla
        
            try {
                await login(req);
            } catch (error) {
                expect(error.status).toBe(400); // Verifica que el estado sea 400
                expect(error.message).toBe('Credenciales incorrectas'); // Verifica el mensaje de error
            }
        });        
    });

    describe('addPet', () => {
        test('should return 400 if userId or pet data is missing', async () => {
            req.params = {}; // Sin userId
            req.body = {}; // Sin datos de mascota
            const result = await addPet(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Missing required fields');
        });
    
        test('should return 400 if userId is invalid', async () => {
            req.params = { userId: 'invalid_id' };
            req.body = { name: 'Buddy', type: 'Dog' };
            const result = await addPet(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Invalid ID format');
        });
    
        test('should return 201 if pet is added successfully', async () => {
            req.params = { userId: '507f1f77bcf86cd799439011' };
            req.body = { name: 'Buddy', type: 'Dog' };
            addUserPet.mockResolvedValue(true);
    
            const result = await addPet(req, res);
            expect(result.status).toBe(201);
            expect(result.message).toBe('Mascota agregada');
        });
    });

    describe('updatePet', () => {
        test('should return 400 if userId or pet data is missing', async () => {
            req.params = {}; // Sin userId
            req.body = {}; // Sin datos de mascota
            const result = await updatePet(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Missing required fields');
        });
    
        test('should return 400 if userId is invalid', async () => {
            req.params = { userId: 'invalid_id' };
            req.body = { name: 'Buddy', type: 'Dog' };
            const result = await updatePet(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Invalid ID format');
        });
    
        test('should return 200 if pet is updated successfully', async () => {
            req.params = { userId: '507f1f77bcf86cd799439011' };
            req.body = { name: 'Buddy', type: 'Dog' };
            updateUserPet.mockResolvedValue(true);
    
            const result = await updatePet(req, res);
            expect(result.status).toBe(200);
            expect(result.message).toBe('Mascota actualizada');
        });
    });

    describe('removePet', () => {
        test('should return 400 if userId or petId is missing', async () => {
            req.params = {}; // Sin userId ni petId
            const result = await removePet(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Missing required fields');
        });
    
        test('should return 400 if userId or petId is invalid', async () => {
            req.params = { userId: 'invalid_id', petId: 'invalid_id' };
            const result = await removePet(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Invalid ID format');
        });
    
        test('should return 200 if pet is removed successfully', async () => {
            req.params = { userId: '507f1f77bcf86cd799439011', petId: '507f1f77bcf86cd799439012' };
            deleteUserPet.mockResolvedValue(true);
    
            const result = await removePet(req, res);
            expect(result.status).toBe(200);
            expect(result.message).toBe('Mascota eliminada');
        });
    });

    describe('addVehicle', () => {
        test('should return 400 if userId or vehicle data is missing', async () => {
            req.params = {}; // Sin userId
            req.body = {}; // Sin datos de vehículo
            const result = await addVehicle(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Missing required fields');
        });
    
        test('should return 400 if userId is invalid', async () => {
            req.params = { userId: 'invalid_id' };
            req.body = { brand: 'Toyota', model: 'Corolla' };
            const result = await addVehicle(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Invalid ID format' );
        });
    
        test('should return 201 if vehicle is added successfully', async () => {
            req.params = { userId: '507f1f77bcf86cd799439011' };
            req.body = { brand: 'Toyota', model: 'Corolla' };
            addUserVehicle.mockResolvedValue(true);
    
            const result = await addVehicle(req, res);
            expect(result.status).toBe(201);
            expect(result.message).toBe('Vehículo agregado');
        });
    });

    describe('updateVehicle', () => {
        test('should return 400 if userId or vehicle data is missing', async () => {
            req.params = {}; // Sin userId
            req.body = {}; // Sin datos de vehículo
            const result = await updateVehicle(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Missing required fields');
        });
    
        test('should return 400 if userId is invalid', async () => {
            req.params = { userId: 'invalid_id' };
            req.body = { brand: 'Toyota', model: 'Corolla' };
            const result = await updateVehicle(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Invalid ID format');
        });
    
        test('should return 200 if vehicle is updated successfully', async () => {
            req.params = { userId: '507f1f77bcf86cd799439011' };
            req.body = { brand: 'Toyota', model: 'Corolla' };
            updateUserVehicle.mockResolvedValue(true);
    
            const result = await updateVehicle(req, res);
            expect(result.status).toBe(200);
            expect(result.message).toBe('Vehículo actualizado');
        });
    });

    describe('removeVehicle', () => {
        test('should return 400 if userId or vehicleId is missing', async () => {
            req.params = {}; // Sin userId ni vehicleId
            const result = await removeVehicle(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Missing required fields');
        });
    
        test('should return 400 if userId or vehicleId is invalid', async () => {
            req.params = { userId: 'invalid_id', vehicleId: 'invalid_id' };
            const result = await removeVehicle(req, res);
            expect(result.status).toBe(400);
            expect(result.message).toBe('Invalid ID format');
        });
    
        test('should return 200 if vehicle is removed successfully', async () => {
            req.params = { userId: '507f1f77bcf86cd799439011', vehicleId: '507f1f77bcf86cd799439012' };
            deleteUserVehicle.mockResolvedValue(true);
    
            const result = await removeVehicle(req, res);
            expect(result.status).toBe(200);
            expect(result.message).toBe('Vehículo eliminado');
        });
    });
});