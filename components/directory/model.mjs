const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    complexId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complex',
        required: true
    },
    service: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    hasWhatsApp: {
        type: Boolean,
        required: true
    },
    whatsAppNumber: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Directory', directorySchema);