const { mongoose } = require("./connect");
const { userModel } = require("./userModel");

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const todosModel = mongoose.model('Todos', todoSchema);

module.exports = {
    todosModel
}