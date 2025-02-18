import mongoose from 'mongoose';
import {
    addUser,
    getUsersByComplex,
    updateUser,
    deleteUser,
    getUserById,
    isCorrectPassword,
    getUser,
    addUserPet,
    updateUserPet,
    deleteUserPet,
    addUserVehicle,
    updateUserVehicle,
    deleteUserVehicle,
} from './store.mjs';

const isNotEmptyOrWhitespace = (str) => str && str.trim().length > 0;

// Login
const login = async (req) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return { status: 400, message: 'Faltan datos' };
    }
    const isAuthenticated = await isCorrectPassword(email, password);
    if (isAuthenticated) { // Si la autenticación es exitosa
        const user = await getUser(email); // Obtiene los datos del usuario
        console.log('LOGIN: ', user.userName); // Muestra un mensaje de bienvenida en la consola
        return { status: 200, message: user }; // Devuelve un objeto con el estado 200 (OK) y user
    } else {
        throw { status: 400, message: 'Credenciales incorrectas' }; // Devuelve un error si la autenticación falla
    }
};

// Create (C)
const add = async (req) => {
    try {
        const { idDocument, userName, idComplex, email, password, phone, apartment, role } = req.body;

        // Validate required fields
        if (!idDocument || !userName || !idComplex || !email || !password || !phone || !apartment || !role) {
            return { status: 400, message: "Los espacios están vacios" };
        }
        if (!isNotEmptyOrWhitespace(idDocument) || !isNotEmptyOrWhitespace(userName) || !isNotEmptyOrWhitespace(idComplex) || !isNotEmptyOrWhitespace(email) || !isNotEmptyOrWhitespace(password) || !isNotEmptyOrWhitespace(phone) || !isNotEmptyOrWhitespace(apartment) || !isNotEmptyOrWhitespace(role)) {
            return { status: 400, message: "Fields cannot empty or contain only whitespace" };
        }
        req.body.role = req.body.role.toUpperCase();
        const user = await addUser(req.body);
        return { status: 201, message: user };
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

// Read (R)
const get = async (req) => {
    const { idComplex } = req.params;
    try {
        if (!idComplex) {
            return { status: 400, message: 'ID is required' };
        }
        // Validar si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(idComplex)) {
            return { status: 400, message: 'Invalid ID format' };
        }
        const users = await getUsersByComplex(idComplex);
        if (!users) {
            return { status: 404, message: 'Users not found' };
        }else{
            return { status: 200, message: users };
        }
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

const getById = async (req) => {
    const { idUser } = req.params;
    try {
        if (!idUser) {
            return { status: 400, message: 'ID is required' };
        }
        // Validar si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(idUser)) {
            return { status: 400, message: 'Invalid ID format' };
        }
        const user = await getUserById(idUser);
        if (!user) {
            return { status: 404, message: 'User not found' };
        }
        return { status: 200, message: user };
    } catch (error) {
        return { status: 400, message: error.message };
    }
}

// Update (U)
const update = async (req) => {
    try {
        const { _id, idDocument, userName, idComplex, email, password, phone, apartment, role } = req.body;

        // Validate required fields
        if (!_id || !idDocument || !userName || !idComplex || !email || !password || !phone || !apartment || !role) {
            return { status: 400, message: "Missing required fields" };
        }
        if (!isNotEmptyOrWhitespace(_id) || !isNotEmptyOrWhitespace(idDocument) || !isNotEmptyOrWhitespace(userName) || !isNotEmptyOrWhitespace(idComplex) || !isNotEmptyOrWhitespace(email) || !isNotEmptyOrWhitespace(password) || !isNotEmptyOrWhitespace(phone) || !isNotEmptyOrWhitespace(apartment) || !isNotEmptyOrWhitespace(role)) {
            return { status: 400, message: "Fields cannot empty or contain only whitespace" };
        }
        await updateUser(req.body);
        return { status: 200, message: 'Usuario actualizado' };
    } catch (error) {
        return { status: 400, message: error.message };
    }
}

// Delete (D)
const remove = async (req) => {
    const { id } = req.params;
    try {
        if (!id) {
            return { status: 400, message: 'ID is required' };
        }
        // Validar si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { status: 400, message: 'Invalid ID format' };
        }
        const deletedUser = await deleteUser(id);
        if (!deletedUser) {
            return { status: 404, message: 'User not found' };
        }
        return { status: 200, message: 'Usuario eliminado' };
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

const addPet = async (req) => {
    try {
        const { userId } = req.params;
        const pet = req.body;

        if (!userId || !pet) {
            return { status: 400, message: 'Missing required fields' };
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return { status: 400, message: 'Invalid ID format' };
        }

        await addUserPet(userId, pet);
        return { status: 201, message: 'Mascota agregada' };
    }
    catch (error) {
        return { status: 400, message: error.message };
    }
}

const updatePet = async (req) => {
    try {
        const { userId } = req.params;
        const pet = req.body;

        if (!userId || !pet) {
            return { status: 400, message: 'Missing required fields' };
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return { status: 400, message: 'Invalid ID format' };
        }

        await updateUserPet(userId, pet);
        return { status: 200, message: 'Mascota actualizada' };
    }
    catch (error) {
        return { status: 400, message: error.message };
    }
}

const removePet = async (req) => {
    try {
        const { userId, petId } = req.params;

        if (!userId || !petId) {
            return { status: 400, message: 'Missing required fields' };
        }

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(petId)) {
            return { status: 400, message: 'Invalid ID format' };
        }

        await deleteUserPet(userId, petId);
        return { status: 200, message: 'Mascota eliminada' };
    }
    catch (error) {
        return { status: 400, message: error.message };
    }
}

const addVehicle = async (req) => {
    try {
        const { userId } = req.params;
        const vehicle = req.body;

        if (!userId || !vehicle) {
            return { status: 400, message: 'Missing required fields' };
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return { status: 400, message: 'Invalid ID format' };
        }

        await addUserVehicle(userId, vehicle);
        return { status: 201, message: 'Vehículo agregado' };
    }
    catch (error) {
        return { status: 400, message: error.message };
    }
}

const updateVehicle = async (req) => {
    try {
        const { userId } = req.params;
        const vehicle = req.body;

        if (!userId || !vehicle) {
            return { status: 400, message: 'Missing required fields' };
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return { status: 400, message: 'Invalid ID format' };
        }

        await updateUserVehicle(userId, vehicle);
        return { status: 200, message: 'Vehículo actualizado' };
    }
    catch (error) {
        return { status: 400, message: error.message };
    }
}

const removeVehicle = async (req) => {
    try {
        const { userId, vehicleId } = req.params;

        if (!userId || !vehicleId) {
            return { status: 400, message: 'Missing required fields' };
        }

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(vehicleId)) {
            return { status: 400, message: 'Invalid ID format' };
        }

        await deleteUserVehicle(userId, vehicleId);
        return { status: 200, message: 'Vehículo eliminado' };
    }
    catch (error) {
        return { status: 400, message: error.message };
    }
}

export { add, get, update, remove, getById, login, addPet, updatePet, removePet, addVehicle, updateVehicle, removeVehicle };