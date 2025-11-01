const { mongoose } = require("./connect");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        minLength: 6
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});


const userModel = mongoose.model('Users', userSchema);

module.exports = {
    userModel
};
