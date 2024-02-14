const express = require('express')
const app = express()
app.use(express.json());

app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on the server`)
    err.status = 'fail'
    err.statusCode = 400
    next(err)
})

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.status = error.status || 'error'
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
})

module.exports = app