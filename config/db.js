const mongoose = require('mongoose');

const connectDB = async()=> {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDb connected: ${conn.connection.host}`.cyan.bold)
}
 module.exports = connectDB;
