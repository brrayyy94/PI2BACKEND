import User from './model.mjs';

export const isCorrectPassword = async (userName, password) => {
    try {
        const foundUser = await User.findOne({ userName });
        if (!foundUser) {
            return "Usuario no encontrado"; // Devuelve un mensaje si el usuario no existe
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

export const getUserName = async (userName) => {
    try {
        const foundUser = await User.findOne({ userName });
        if (!foundUser) {
            return false; // Usuario no encontrado
        }
        return foundUser.userName; // Devuelve el nombre del usuario
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
        return 'Usuario creado';
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
export const deleteUser = async (user) => {
    try {
        await User.findByIdAndDelete(user._id);
        return 'Usuario eliminado';
    }
    catch (error) {
        throw new Error(error);
    }
};