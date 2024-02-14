const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        lowercase: true
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product