import { addUser, getUsersByComplex, updateUser, deleteUser, getUserById, isCorrectPassword, getUser} from './store.mjs';
import User from './model.mjs';

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
            console.log('Bienvenido', user.userName); // Muestra un mensaje de bienvenida en la consola
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
            throw { status: 400, message: "Los espacios están vacios" };
        }

        const user = await addUser(req.body);
        return { status: 201, message: user };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

// Read (R)
const get = async (req, res) => {
    try {
        const { idComplex } = req.query;
        const users = await getUsersByComplex(idComplex);
        return { status: 200, message: users };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

const getById = async (req, res) => {
    try {
        const { idUser } = req.query;
        const user = await getUserById(idUser);
        return { status: 200, message: user };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
}

// Update (U)
const update = async (req, res) => {
    try {
        await updateUser(req.body);
        return { status: 200, message: 'Usuario actualizado' };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
}

// Delete (D)
const remove = async (req, res) => {
    try {
        await deleteUser(req.body);
        return { status: 200, message: 'Usuario eliminado' };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

export { add, get, update, remove, getById, login};