import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    idDocument: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    idComplex: {
        type: String,
        ref: 'Complex',
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    apartment: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'RESIDENT'],
        required: true
    }
});

// Antes de guardar el usuario, encriptamos la contraseña
userSchema.pre('save', async function(next) {
    if(this.isNew || this.isModified('password')) {
        try {
            const salt = await bcryptjs.genSalt(5);
            this.password = await bcryptjs.hash(this.password, salt);
        } catch (error) {
            // Manejar el error
            return next(error);
        }
    }
    next();
});

// Método para comparar la contraseña ingresada con la contraseña almacenada
userSchema.methods.comparePassword = async function(password) {
    try {
        const isMatch = await bcryptjs.compare(password, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};


export default mongoose.model('User', userSchema);