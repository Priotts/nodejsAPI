const errorHandler = (error, req, res, next) => {
    // Duplicate key error
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(400).json({ status: 'fail', message: `Duplicate key error: ${field} already exists.` });
    }
    // ValidationError
    if (error.name === 'ValidationError') {
        return res.status(400).json({ status: 'fail', message: error.message });
    }
    const status = error.status || 400;
    res.status(status || 500).json({ status: 'fail', message: error.message })
    console.log(error.status)
}

module.exports = errorHandler