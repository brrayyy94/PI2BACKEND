import mongoose from "mongoose";

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
        }
    ]
});

export default mongoose.model('Complex', complexSchema);