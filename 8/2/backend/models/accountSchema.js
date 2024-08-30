const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    }
})

module.exports = mongoose.model('Account', accountSchema);