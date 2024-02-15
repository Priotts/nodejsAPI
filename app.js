const express = require('express')
const app = express()
app.use(express.json());

const userRouter = require('./routes/user');
const errorHandler = require('./middleware/errorHandler');

app.use('/api/user', userRouter)

app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on the server`)
    err.status = 400
    next(err)
})



app.use(errorHandler)

module.exports = app