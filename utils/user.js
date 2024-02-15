const User = require('../schema/user')

const users = async (req, res, next) => {
    try {
        const user = await User.find()
        user.length > 0 ? res.status(200).json({ status: 'ok', data: { user } }) : res.status(200).json({ status: 'ok', message: 'No users found', data: { user } })
    } catch (err) {
        next(err)
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        user ? res.status(200).json({ status: 'ok', data: { user } }) : res.status(404).json({ status: 'error', message: 'User not found' })
    }
    catch (err) {
        next(err)
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ status: 'ok', data: { user } })
    } catch (err) {
        next(err);
    }
};

const updataUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const email = req.body.email
        if (!email) {
            return res.status(400).json({ status: 'fail', message: 'Email is required' })
        }
        const user = await User.findByIdAndUpdate(id, { email: req.body.email }, { runValidators: true, new: true })
        user ? res.status(200).json({ status: 'ok', data: [user] }) : res.status(404).json({ status: 'ok', message: 'User not found' })
    }
    catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        user ? res.status(200).json({ status: 'ok', message: 'User successfully deleted' }) : res.status(404).json({ status: 'fail', message: 'User not found' })
    }
    catch (err) {
        next(err)
    }
}

module.exports = { users, getUser, createUser, updataUser, deleteUser };