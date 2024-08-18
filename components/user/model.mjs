import mongoose from 'mongoose';

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

export default mongoose.model('User', userSchema);