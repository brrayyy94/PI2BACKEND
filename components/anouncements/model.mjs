import mongoose from 'mongoose';
import User from '../user/model.mjs';

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
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Complex', 
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
        enum: ['Fumigacion', 'ServiciosPublicos', 'Asamblea'], 
        required: true 
    }
});

// Pre-save middleware to set dates to UTC and set CreatedBy
anounSchema.pre('save', async function(next) {
    this.Date = new Date().toISOString();
    this.LastModify = new Date().toISOString();

    if (!this.CreatedBy) {
        try {
            const user = await User.findById(this.User);
            if (user) {
                this.CreatedBy = user.userName;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            return next(error);
        }
    }

    next();
});

export default mongoose.model('Announcement', anounSchema);