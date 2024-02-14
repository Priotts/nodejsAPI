const mongoose = require('mongose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        minlength: [4, 'At least 4 characters'],
        maxlength: 20
    },
    surname: {
        type: String,
        required: true,
        lowercase: true,
        minlength: [4, 'At least 4 characters'],
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
        },

    }
})

const User = mongoose.model('User', userSchema)
module.exports = User