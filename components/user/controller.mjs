import { addUser, getUsers, updateUser, deleteUser } from './store.mjs';
import User from './model.mjs';

// Create (C)
const add = async (req, res) => {
    try {
        const user = await addUser(req.body);
        success(req, res, user, 201);
    } catch (error) {
        error(req, res, error, 500);
    }
};

// Read (R)
const get = async (req, res) => {
    try {
        const users = await getUsers();
        success(req, res, users, 200);
    } catch (error) {
        error(req, res, error, 500);
    }
};

// Update (U)
const update = async (req, res) => {
    try {
        await updateUser(req.body);
        success(req, res, 'Usuario actualizado', 200);
    }
    catch (error) {
        error(req, res, error, 500);
    }
}

// Delete (D)
const remove = async (req, res) => {
    try {
        await deleteUser(req.body);
        success(req, res, 'Usuario eliminado', 200);
    }
    catch (error) {
        error(req, res, error, 500);
    }
};

export { add, get, update, remove };