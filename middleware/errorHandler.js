const errorHandler = (error, req, res, next) => {

    if (error.name === 'ValidationError') {
        console.log(error)
        res.status(400).json({
            status: 'fail',
            type: "ValidationError",
            message: error.message,
        })
    }
    else {
        res.status(error.status || 500).json({ status: 'fail', message: error.message })
    }

}

module.exports = errorHandler