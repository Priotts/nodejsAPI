const User = require("../schema/user")
const Product = require("../schema/product")
const Order = require("../schema/order")

const order = async (req, res, next) => {
    try {
        const order = await Order.find().populate('products').populate('users')
        order.length > 0 ? res.status(200).json({ status: 'ok', data: { order } }) : res.status(200).json({ status: 'ok', message: 'No orders', data: { order } })
    } catch (err) {
        next(err)
    }
}

const getOrder = async (req, res, next) => {
    try {
        const { id } = req.params
        const order = await Order.findById(id).populate('products').populate('users')
        order ? res.status(200).json({ status: 'ok', data: { order } }) : res.status(404).json({ status: 'fail', message: 'Order not found' })
    }
    catch (err) {
        next(err)
    }
}

const createOrder = async (req, res, next) => {
    try {
        if (!req.body.productId || !req.body.userId) {
            return res.status(400).json({ status: 'fail', message: 'productId and userId are required' });
        }
        const product = await Product.findById(req.body.productId)
        const user = await User.findById(req.body.userId)
        if (user && product) {
            console.log(product, user)
            const order = new Order({ products: [product], users: [user] })
            const newOrder = await order.save()
            res.status(200).json({ status: 'ok', data: { order: newOrder } })
        }
        else {
            res.status(404).json({ status: 'fail', message: 'User/Product not found' })
        }

    } catch (err) {
        next(err)
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(req.body.userId)
        const product = await Product.findById(req.body.productId)
        if (user && product) {
            const order = await Order.findByIdAndUpdate(id, { products: [product], users: [user] }, { new: true });
            order ? res.status(200).json({ status: 'ok', message: 'Order updated', data: { order } }) : res.status(404).json({ status: 'fail', message: 'Order not found' })
        }
        else {
            res.status(404).json({ status: 'fail', message: 'User/Product not found' })
        }

    } catch (err) {
        next(err)
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params
        const order = await Order.findByIdAndDelete(id)
        order ? res.status(200).json({ status: 'ok', message: 'Order cancelled' }) : res.status(404).json({ status: 'fail', message: 'Order not found' })
    } catch (err) {
        next(err)
    }
}

const filterByProduct = async (req, res, next) => {
    try {
        const { name } = req.params
        const product = await Product.findOne({ name: name })
        console.log(product)
        if (product) {
            const order = await Order.find({ products: product._id }).populate('products').populate('users')
            console.log(order)
            order.length > 0 ? res.status(200).json({ status: 'ok', data: { order } }) : res.status(404).json({ status: 'fail', message: 'Order not found' })
        } else {
            res.status(404).json({ status: 'fail', message: 'Product name not found' })
        }
    } catch (err) {
        next(err)
    }
}

const filterByDate = async (req, res, next) => {
    try {
        const { data } = req.params;
        const orderDate = new Date(data);
        const order = await Order.find({ orderDate: { $gte: orderDate } }).populate('products').populate('users')
        order.length > 0 ? res.json({status: 'ok', data: {order}}) : res.status(404).json({status: 'fail', message: 'Order not found'})
    } catch (err) {
        next(err)
    }
}
module.exports = { order, getOrder, createOrder, updateOrder, deleteOrder, filterByProduct,filterByDate };