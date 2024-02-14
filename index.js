require('dotenv').config();
const app = require("./app");
const mongoose = require('mongoose');

const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ycezrcw.mongodb.net/`

mongoose.connect(dbURL)
    .then((result) => app.listen(3000, () => console.log('Server Running')))
    .catch((error) => console.error(error))