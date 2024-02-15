const Product = require("../schema/product")

const product = async (req, res, next) => {
    try {
        const product = await Product.find()
        product.length > 0 ? res.status(200).json({ status: 'ok', data: { product } }) : res.status(200).json({ status: 'ok', message: "No product found", data: { product } })
    }
    catch (err) {
        next(err)
    }
}

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        product ? res.status(200).json({ status: 'ok', data: { product } }) : res.status(404).json({ status: 'error', message: 'Product not found' })
    }
    catch (err) {
        next(err)
    }
}

const createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.json({ status: 'ok', data: { product } })
    }
    catch (err) {
        next(err)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const name= req.body.name
        if(!name){
            return res.status(400).json({ status: 'fail', message: 'Name is required' })
        }
        const product = await Product.findByIdAndUpdate(id, { name: req.body.name, description: req.body.description }, { new: true })
        product ? res.status(200).json({ status: 'ok',  data: { product } }) : res.status(404).json({ status: 'ok', message: 'product not found' })

    }
    catch (err) {
        next(err)
    }
}

const deleteProduct = async(req,res,next) =>{
    try{
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        product ? res.status(200).json({ status: 'ok', message: 'Product successfully deleted' }) : res.status(404).json({ status: 'fail', message: 'Product not found' })
    }   
    catch(err){
        next(err)
    }
}
module.exports = { product, getProduct, createProduct, updateProduct, deleteProduct };