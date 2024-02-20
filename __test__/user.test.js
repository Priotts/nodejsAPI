const User = require("../schema/user")
const { users, getUser, createUser, updateUser, deleteUser } = require('../utils/user')

jest.mock('../schema/user')

describe('Get /user', () => {
    it('should return a list of users if there are any', async () => {
        const mockUser = [{ name: 'test', surname: 'test', email: 'test@gmail.com' }];

        User.find.mockResolvedValue(mockUser);

        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();
        await users(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', data: { user: mockUser } });
    })
    it('Should return a fail mss if there are no users', async () => {
        User.find.mockResolvedValue([])
        const req = {}
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        }
        const next = jest.fn();
        await users(req, res, next)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', message: 'No users found', data: { user: [] } });

    })
})

describe('get /user/:id', () => {
    it('should return the user', async () => {
        const mockUser = { id: '000', name: 'test', surname: 'test', email: 'test@gmail.com' };
        User.findById.mockResolvedValue(mockUser);
        const req = { params: { id: mockUser.id } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        }
        const next = jest.fn()
        await getUser(req, res, next)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', data: { user: mockUser } });
    })
    it("Should return error", async () => {
        User.findById.mockResolvedValue(null)
        const req = { params: { id: 'id' } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        const next = jest.fn()
        await getUser(req, res, next)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ status: 'error', message: 'User not found' })
    })
})

describe('Post /user', () => {
    it('Should create User', async () => {
        const mockUser = { _id: 'id', name: 'Test', surname: 'Testx', email: 'Test@gmail.com' }
        const req = { body: mockUser }
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        User.prototype.save.mockResolvedValueOnce(mockUser)
        await createUser(req, res)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', data: { user: mockUser } })

    });

});

describe("Patch /user/:id", () => {
    it("Should update user", async () => {
        const mockUser = { _id: 'id', name: 'Test', surname: 'Test x', email: 'Test@gmail.com' };
        const mockUpdatedUser = { ...mockUser, email: 'Updated@gmail.com' };

        const req = {
            params: { id: mockUser._id },
            body: { email: 'Updated@gmail.com' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
        User.findByIdAndUpdate.mockResolvedValue(mockUpdatedUser);
        const next = jest.fn()
        await updateUser(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', data: { user: mockUpdatedUser } });
    })
    it('should return 404 if user not found', async () => {
        const req = {
            params: { id: 'id' },
            body: { email: 'Updated@gmail.com' }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        User.findByIdAndUpdate.mockResolvedValue(null);
        await updateUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: 'User not found' });
    });
})


describe("delete /user/:id", () => {
    it("Should delete user", async () => {
        const mockUser = { _id: 'id', name: 'Test', surname: 'Test x', email: 'Test@gmail.com' };
        const req = { params: { id: mockUser._id } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        User.findByIdAndDelete.mockResolvedValue(mockUser);
        await deleteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ status: 'ok', message: 'User successfully deleted' });
    })
    it('should return 404 if user not found', async () => {
        const req = { params: { id: 'id' } };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        User.findByIdAndDelete.mockResolvedValue(null);
        await deleteUser(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ status: 'fail', message: 'User not found' });
    });
})