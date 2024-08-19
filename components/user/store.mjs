import User from './model.mjs';

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