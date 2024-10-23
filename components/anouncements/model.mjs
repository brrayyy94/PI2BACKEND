import mongoose from 'mongoose';
import User from '../user/model.mjs';

const reactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['recommend', 'celebrate', 'support', 'love', 'interest', 'removed'],
        required: true
    }
}, { _id: false });

const anounSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    CreatedBy: {
        type: String,
        required: true
    },
    Complex: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Body: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    },
    LastModify: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        enum: ['Mantenimiento', 'Servicios', 'Reuniones', 'General', 'Publicidad'],
        required: true
    },
    reactions: [reactionSchema]
});

anounSchema.index({ Title: 'text', Body: 'text' });

// Pre-validate middleware to set dates to UTC and set CreatedBy
anounSchema.pre('validate', async function (next) {
    this.Date = new Date().toISOString();
    this.LastModify = new Date().toISOString();

    try {
        const user = await User.findById(this.User);
        if (user) {
            this.CreatedBy = user.userName;
            this.isAdmin = user.role === 'ADMIN';
            this.Complex = user.idComplex;
        } else {
            return { status: 404, message: 'User not found' };
        }

        // Set the category based on user role
        if (!this.isAdmin) {
            this.category = 'Publicidad';
        }
    } catch (error) {
        return next(error);
    }

    next();
});

export default mongoose.model('Announcement', anounSchema);