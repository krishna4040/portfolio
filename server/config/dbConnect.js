const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {console.log("db connected");})
        .catch((err) => {throw new Error(err)})
    } catch (error) {
        console.log("could not connect db",error);
    }
}