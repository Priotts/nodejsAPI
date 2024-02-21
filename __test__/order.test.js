const Order = require("../schema/order")
const Product = require("../schema/product")
const User = require("../schema/user")

const { createOrder, updateOrder, deleteOrder} = require('../utils/order')

jest.mock('../schema/order')
jest.mock('../schema/product')
jest.mock('../schema/user')


describe('createOrder', () => {
    it('should create a order', async () => {
        const mockUser = { id: 'userId', name: 'testName', surname: 'test', email: 'test@gmail.com' }
        const mockProduct = { id: 'productId', name: 'product' }
        const mockOrder = { products: [mockProduct], users: [mockUser] };

        Product.findById.mockResolvedValue(mockProduct)
        User.findById.mockResolvedValue(mockUser);
        Order.prototype.save.mockResolvedValue(mockOrder)

        const req = {
            body: {
                productId: 'productId',
                userId: 'userId',
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }

        const next = jest.fn()
        await createOrder(req, res, next);

        expect(User.findById).toHaveBeenCalled()
        expect(Product.findById).toHaveBeenCalled()
        expect(Order.prototype.save).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', data: { order: mockOrder } });

    })

    it('should return a fail mss if there are no products', async () => {
        Product.findById.mockResolvedValue(null)
        const req = {
            body: {
                productId: 'productId',
                userId: 'userId',
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        const next = jest.fn()

        await createOrder(req, res, next)
        expect(Product.findById).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: 'User/Product not found' });
    })

})

describe('updateOrder', () => {
    it('should update a order', async () => {
        const mockUser = { id: 'userId', name: 'testName', surname: 'test', email: '' }
        const mockProduct = { id: 'productId', name: 'product' }
        const mockOrder = { products: [mockProduct], users: [mockUser] };

        Product.findById.mockResolvedValue(mockProduct)
        User.findById.mockResolvedValue(mockUser);
        Order.findByIdAndUpdate.mockResolvedValue(mockOrder)

        const req = {
            body: {
                productId: 'productId',
                userId: 'userId',
            },
            params: {
                id: 'orderId'
            }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }

        const next = jest.fn()
        await updateOrder(req, res, next);

        expect(User.findById).toHaveBeenCalled()
        expect(Product.findById).toHaveBeenCalled()
        expect(Order.findByIdAndUpdate).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', message: 'Order updated', data: { order: mockOrder } });

    })

    it('should return a fail mss if there are no products', async () => {
        Product.findById.mockResolvedValue(null)
        const req = {
            body: {
                productId: 'productId',
                userId: 'userId',
            },
            params: {
                id: 'orderId'
            }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        const next = jest.fn()

        await updateOrder(req, res, next)
        expect(Product.findById).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: 'User/Product not found' });
    })
})

describe('deleteOrder', () => {
    it('should delete a order', async () => {
        const mockOrder = { id: 'orderId' }
        Order.findByIdAndDelete.mockResolvedValue(mockOrder)

        const req = {
            params: {
                id: 'orderId'
            }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }

        const next = jest.fn()
        await deleteOrder(req, res, next);

        expect(Order.findByIdAndDelete).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', message: 'Order cancelled' });

    })

    it('should return a fail mss if there are no order', async () => {
        Order.findByIdAndDelete.mockResolvedValue(null)
        const req = {
            params: {
                id: 'orderId'
            }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        const next = jest.fn()

        await deleteOrder(req, res, next)
        expect(Order.findByIdAndDelete).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: 'Order not found' });
    })
})

