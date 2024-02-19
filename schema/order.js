const mongoose = require('mongoose')
const { Schema } = mongoose

const OrderSchema = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order