import { addUser, getUsersByComplex, updateUser, deleteUser, isCorrectPassword, getUserName } from './store.mjs';
import User from './model.mjs';

// Login
const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return { status: 400, message: 'Faltan datos' };
        }
        const isAuthenticated = await isCorrectPassword(userName, password);
        if (isAuthenticated) { // Si la autenticación es exitosa
            const name = await getUserName(userName); // Obtiene el nombre del usuario
            console.log('Bienvenido', name); // Muestra un mensaje de bienvenida en la consola
            return {status: 200, message: `Usuario ${name} logeado correctamente`, userName: name}; // Devuelve un objeto con el estado 200 (OK) y un mensaje de éxito
        }
    }catch (error) {
        throw { status: 400, message: error.message };
    }
};

// Create (C)
const add = async (req, res) => {
    try {
        const user = await addUser(req.body);
        return { status: 201, message: user };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

// Read (R)
const get = async (req, res) => {
    try {
        const { idComplex } = req.body;
        const users = await getUsersByComplex(idComplex);
        return { status: 200, message: users };
    } catch (error) {
        throw { status: 400, message: error.message };
    }
};

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

export { add, get, update, remove, login };