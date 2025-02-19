import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const vehicleSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
});

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});

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
        unique: true,
        lowercase: true
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
    },
    vehicles: {
        type: [vehicleSchema],
        default: []
    },
    pets: {
        type: [petSchema],
        default: []
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
    console.log("Contraseña ingresada:", password);
    console.log("Contraseña en la base de datos:", this.password);
    return await bcryptjs.compare(password, this.password);
};

export default mongoose.model('User', userSchema);