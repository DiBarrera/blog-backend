const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    order: {
        type: Number
    },
    active: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Menu", MenuSchema)