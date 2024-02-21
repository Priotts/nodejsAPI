const Product = require("../schema/product")
const { product, getProduct, createProduct, updateProduct, deleteProduct } = require('../utils/product')

jest.mock('../schema/product')


describe('Get /product', () => {
    it('should return a list of products if there are any', async () => {
        const mockProduct = [{ name: 'test Product' }]
        Product.find.mockResolvedValue(mockProduct);
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();
        await product(req, res, next);
        expect(Product.find).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', data: { product: mockProduct } });
    })
    it('Should return a fail mss if there are no products', async () => {
        Product.find.mockResolvedValue([])
        const req = {}
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        const next = jest.fn()

        await product(req, res, next)
        expect(Product.find).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', message: "No product found", data: { product: [] } });

    })
})


describe('get /product/:id', () => {
    it('should return the product', async () => {
        const mockProduct = { id: '00', name: 'test product' }
        Product.findById.mockResolvedValue(mockProduct)
        const req = { params: { id: mockProduct.id } }
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        const next = jest.fn()
        await getProduct(req, res, next)
        expect(Product.findById).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', data: { product: mockProduct } })
    })
    it("Should return error", async () => {
        Product.findById.mockResolvedValue(null)
        const req = { params: { id: 'fakeID' } }
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        const next = jest.fn()
        await getProduct(req, res, next)
        expect(Product.findById).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ status: 'error', message: 'Product not found' })
    })
})

describe('Post /product', () => {
    it('Should create product', async () => {
        const mockProduct = [{ name: 'test Product' }]
        const req = { body: mockProduct }
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        const next = jest.fn()
        Product.prototype.save.mockResolvedValue(mockProduct)
        await createProduct(req, res, next)
        expect(Product.prototype.save).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', data: { product: mockProduct } })

    });

});

describe("Patch /product/:id", () => {
    it("Should update product", async () => {
        const mockProduct = { id: '000', name: 'test Product' }
        const mockUpdatedProduct = { ...mockProduct, name: 'new test name' };

        const req = {
            params: { id: mockProduct.id },
            body: { name: 'new test name' }
        }

        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        Product.findByIdAndUpdate.mockResolvedValue(mockUpdatedProduct);
        const next = jest.fn()
        await updateProduct(req, res, next)
        expect(Product.findByIdAndUpdate).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok',  data: { product: mockUpdatedProduct } })
    })

    it('should return 404 if product not found', async () => {
        const req ={
            params : {id: '00'},
            body: {name: 'new name'}
        }
        const res ={
            json:jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        Product.findByIdAndUpdate.mockResolvedValue(null)
        const next = jest.fn()
        await updateProduct(req, res, next)
        expect(Product.findByIdAndUpdate).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', message: 'Product not found' })
    });
})

describe('Delete /product/:id', () => {
    it('Should delete product', async () => {
        const mockProduct = { id: '00', name: 'test product' }
        const req = { params: { id: mockProduct.id } }
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        const next = jest.fn()
        Product.findByIdAndDelete.mockResolvedValue(mockProduct)
        await deleteProduct(req, res, next)
        expect(Product.findByIdAndDelete).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', message: 'Product successfully deleted' })
    })
    it('Should return 404 if product not found', async () => {
        const req = { params: { id: '00' } }
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        const next = jest.fn()
        Product.findByIdAndDelete.mockResolvedValue(null)
        await deleteProduct(req, res, next)
        expect(Product.findByIdAndDelete).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: 'Product not found' })
    })
})