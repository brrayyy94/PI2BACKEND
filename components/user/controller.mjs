import { addUser, getUsersByComplex, updateUser, deleteUser, getUserById, isCorrectPassword, getUser} from './store.mjs';
import mongoose from 'mongoose';

const isNotEmptyOrWhitespace = (str) => str && str.trim().length > 0;

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return { status: 400, message: 'Faltan datos' };
        }
        const isAuthenticated = await isCorrectPassword(email, password);
        if (isAuthenticated) { // Si la autenticación es exitosa
            const user = await getUser(email); // Obtiene los datos del usuario
            console.log('LOGIN: ', user.userName); // Muestra un mensaje de bienvenida en la consola
            return {status: 200, message:user}; // Devuelve un objeto con el estado 200 (OK) y un mensaje de éxito
        }
    }catch (error) {
        throw { status: 400, message: error.message };
    }
};

// Create (C)
const add = async (req, res) => {
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
const get = async (req, res) => {
    const { idComplex } = req.params;
    try {
        if (!idComplex) {
            return { status: 400, message: 'ID is required' };
        }
        // Validar si el ID es un ObjectId válido
         if (!mongoose.Types.ObjectId.isValid(idComplex)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const users = await getUsersByComplex(idComplex);
        if (!users) {
            return { status: 404, message: 'Users not found' };
        }
        return { status: 200, message: users };
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

const getById = async (req, res) => {
    const { idUser } = req.params;
    try {
        if (!idUser) {
            return { status: 400, message: 'ID is required' };
        }
        // Validar si el ID es un ObjectId válido
         if (!mongoose.Types.ObjectId.isValid(idUser)) {
            return res.status(400).json({ message: 'Invalid ID format' });
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
const update = async (req, res) => {
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
const remove = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return { status: 400, message: 'ID is required' };
        }
        // Validar si el ID es un ObjectId válido
         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
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

export { add, get, update, remove, getById, login};
