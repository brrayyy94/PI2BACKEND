import User from './model.mjs';

export const isCorrectPassword = async (email, password) => {
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return "Correo no encontrado"; // Devuelve un mensaje si el usuario no existe
        }
        try {
            const isMatch = await foundUser.comparePassword(password); // Compara la contraseña ingresada con la contraseña almacenada
            return isMatch; // Devuelve true si la contraseña es correcta, false si no lo es
        } catch (error) {
            console.error('Error al comparar contraseñas:', error);
            return false; // Devolver false si hay un error
        }
    } catch (error) {
        console.error('Error en isCorrectPassword:', error);
        throw new Error('Error interno');
    }
};

export const getUser = async (email) => {
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return "Usuario no encontrado"; // Usuario no encontrado
        }
        return foundUser; // Devuelve los datos del usuario
    } catch (error) {
        console.error('Error en getUserName:', error);
        throw new Error('Error interno');
    }
};
// Create (C)
export const addUser = async (user) => {
    try {
        const newUser = new User(user);
        await newUser.save();
        return 'Usuario creado\n', newUser;
    } catch (error) {
        throw new Error(error);
    }
};

// Read (R)
export const getUsersByComplex = async (idComplex) => {
    try {
        const users = await User.find({ idComplex });
        return users;
    } catch (error) {
        throw new Error(error);
    }
};

export const getUserById = async (idUser) => {
    try {
        const user = await User.findById(idUser);
        return user;
    }
    catch (error) {
        throw new Error(error);
    }
}

// Update (U)
export const updateUser = async (user) => {
    try {
        await User.findByIdAndUpdate(user._id, user);
        return 'Usuario actualizado';
    }
    catch (error) {
        throw new Error(error);
    }
};

// Delete (D)
export const deleteUser = async (_id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(_id);
        return deletedUser;
    }
    catch (error) {
        throw new Error(error);
    }
};

/**
 * Agrega una mascota a un usuario.
 * @param {string} idUser - El ID del usuario.
 * @param {Object} pet - El objeto de la mascota.
 * @param {string} pet.name - El nombre de la mascota.
 * @param {string} pet.type - El tipo de mascota.
 * @param {string} pet.breed - La raza de la mascota.
 * @param {string} pet.color - El color de la mascota.
 * @returns {Promise<string>} - Retorna un mensaje indicando que la mascota fue añadida.
 * @throws {Error} - Retorna un error si ocurre algún problema.
 */
export const addUserPet = async (idUser, pet) => {
    try {
        const user = await User.findById(idUser);

        if (!user.pets) {
            user.pets = [];
        }

        user.pets.push(pet);
        await user.save();
        return 'Mascota añadida';
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Actualiza una mascota de un usuario.
 * @param {string} idUser - El ID del usuario.
 * @param {Object} pet - El objeto de la mascota.
 * @returns {Promise<string>} - Retorna un mensaje indicando que la mascota fue actualizada.
 * @throws {Error} - Retorna un error si ocurre algún problema.
 */
export const updateUserPet = async (idUser, pet) => {
    try {
        const user = await User.findById(idUser);
        const index = user.pets.findIndex(p => p._id == pet._id);
        user.pets[index] = pet;
        await user.save();
        return 'Mascota actualizada';
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Elimina una mascota de un usuario.
 * @param {string} idUser - El ID del usuario.
 * @param {string} idPet - El ID de la mascota.
 * @returns {Promise<string>} - Retorna un mensaje indicando que la mascota fue eliminada.
 * @throws {Error} - Retorna un error si ocurre algún problema.
 */
export const deleteUserPet = async (idUser, idPet) => {
    try {
        const user = await User.findById(idUser);
        user.pets = user.pets.filter(pet => pet._id != idPet);
        await user.save();
        return 'Mascota eliminada';
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Agrega un vehículo a un usuario.
 * @param {string} idUser - El ID del usuario.
 * @param {Object} vehicle - El objeto del vehículo.
 * @param {string} vehicle.model - El modelo del vehículo.
 * @param {string} vehicle.plate - La placa del vehículo.
 * @param {string} vehicle.color - El color del vehículo.
 * @param {string} vehicle.year - El año del vehículo.
 * @returns {Promise<string>} - Retorna un mensaje indicando que el vehículo fue añadido.
 * @throws {Error} - Retorna un error si ocurre algún problema.
 */
export const addUserVehicle = async (idUser, vehicle) => {
    try {
        const user = await User.findById(idUser);

        if (!user.vehicles) {
            user.vehicles = [];
        }

        user.vehicles.push(vehicle);
        await user.save();
        return 'Vehículo añadido';
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Actualiza un vehículo de un usuario.
 * @param {string} idUser - El ID del usuario.
 * @param {Object} vehicle - El objeto del vehículo.
 * @returns {Promise<string>} - Retorna un mensaje indicando que el vehículo fue actualizado.
 * @throws {Error} - Retorna un error si ocurre algún problema.
 */
export const updateUserVehicle = async (idUser, vehicle) => {
    try {
        const user = await User.findById(idUser);
        const index = user.vehicles.findIndex(v => v._id == vehicle._id);
        user.vehicles[index] = vehicle;
        await user.save();
        return 'Vehículo actualizado';
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Elimina un vehículo de un usuario.
 * @param {string} idUser - El ID del usuario.
 * @param {string} idVehicle - El ID del vehículo.
 * @returns {Promise<string>} - Retorna un mensaje indicando que el vehículo fue eliminado.
 * @throws {Error} - Retorna un error si ocurre algún problema.
 */
export const deleteUserVehicle = async (idUser, idVehicle) => {
    try {
        const user = await User.findById(idUser);
        user.vehicles = user.vehicles.filter(vehicle => vehicle._id != idVehicle);
        await user.save();
        return 'Vehículo eliminado';
    } catch (error) {
        throw new Error(error);
    }
};