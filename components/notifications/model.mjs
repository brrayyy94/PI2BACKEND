import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true
    },
    expirationTime: {
        type: Number,
        default: null
    },
    keys: {
        p256dh: {
            type: String,
            required: true
        },
        auth: {
            type: String,
            required: true
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userComplex: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complex',
        required: true
    }
}, { versionKey: false });

export default mongoose.model('Notification', notificationSchema);