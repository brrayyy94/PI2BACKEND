import mongoose from "mongoose";

const availableHoursSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
}, { _id: false });

const zoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    complex: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complex',
        required: true
    },
    description: {
        type: String,
        required: false
    },
    availableDays: {
        type: [String],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true
    },
    availableHours: {
        type: availableHoursSchema,
        required: true
    }
}, { _id: true });

const complexSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    admins: {
        type: Array
    },
    residents: {
        type: Array
    },
    config: {
        primaryColor: {
            type: String,
            required: true
        },
        secondaryColor: {
            type: String,
            required: true
        }
    },
    emergencyNumbers: [
        {
            name: {
                type: String
            },
            number: {
                type: String
            }
        },
    ],
    zones: {
        type: [zoneSchema],
        default: []
    }
});


export default mongoose.model('Complex', complexSchema);