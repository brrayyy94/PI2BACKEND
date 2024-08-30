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