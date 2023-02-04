const mongoose = require('mongoose')
const TodoShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    finished: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('todo', TodoShema);