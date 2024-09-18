const { mongoose } = require("./connect");

const adminSchema = new mongoose.Schema({
    admin: {
        type: String,
        default: "dev"  
    },
    token: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }
});

const adminModel = mongoose.model('Admin', adminSchema);

module.exports = {
    adminModel
};
