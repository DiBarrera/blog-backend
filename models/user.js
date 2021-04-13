const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    apellido: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: String,   // <--- ESTO ES DE UDEMY
    active: Boolean,   // <--- ESTO ES DE UDEMY
    registro: {
      type: Date,
      default: Date.now()
    },
    imgProfile: {
      type: String,
      default:"./img"
    }
})

module.exports = mongoose.model("User", UserSchema)