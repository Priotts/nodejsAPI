const User = require('../schema/user')

const users = async (req, res, next) => {
    try {
        const user = await User.find()
        if (user.length > 0) {
            res.json({ status: 'ok', data: { user } })
        } else {
            const err = new Error('User not found')
            err.status = 404
            throw err
        }
    } catch (err) {
        next(err)
    }
}

const createUser = async (req, res, next) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.json({ status: 'ok', data: { user } })
    } catch (err) {
        next(err);
    }
};




module.exports = { users, createUser };