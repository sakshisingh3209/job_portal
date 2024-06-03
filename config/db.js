const mongoose = require('mongoose');

const color = require('color');
const db = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_LOCAL_URL);
        console.log(`Connected to Mongodb Database ${mongoose.connection.host}`)
    } catch (err) {
        console.log(`MongoDb Error ${err}`.bgRed.white);
    }
}

module.exports = db;