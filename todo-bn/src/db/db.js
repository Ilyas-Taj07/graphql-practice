const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)

        console.log('📦 Database is connected')

    }
    catch (err) {
        console.log("Error while connecting DB", err)
    }
}

module.exports = connectDB