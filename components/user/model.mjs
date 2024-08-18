import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    idDocument: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    idConjunto: {
        type: String,
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
    rol: {
        type: String,
        enum: ['ADMIN', 'RESIDENT'],
        required: true
    }
});

export default mongoose.model('User', userSchema);