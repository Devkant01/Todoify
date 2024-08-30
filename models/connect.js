const { db_connection } = require("../config/config");
const mongoose = require("mongoose");
mongoose.connect(db_connection)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("MongoDB connection error: ", err);
        
    });

module.exports = {
    mongoose
}