import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    admin: {
        type: String,
        required: function() { return !this.resident; } // Required if user is not present
    },
    resident: {
        type: String,
        required: function() { return !this.admin; } // Required if admin is not present
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const pqrsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    complex: {
        type: String,
        required: true
    },
    case: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['P', 'Q', 'R', 'S'],
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    state: {
        type: String,
        enum: ['pendiente', 'tramite', 'cerrado'],
        required: true,
        default: 'pendiente'
    },
    answer: [answerSchema]
});

const Pqrs = mongoose.model('Pqrs', pqrsSchema);

export default Pqrs;