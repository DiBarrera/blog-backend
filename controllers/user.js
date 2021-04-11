const bcrypt = require("bcrypt-nodejs");
// const bcrypt = require("bcrypt");   // <--- ESTE SE COMENTA PORQUE SU SYNTAX NO LA HE APRENDIDO A USAR
const User = require("../models/user");

function signUp(req, res) {
    console.log("Endpoint de signUp ejecutado")

    const user = new User()

    console.log(req.body)

    const { nombre, apellido, email, password, repeatPassword } = req.body
    user.nombre = nombre
    user.apellido = apellido
    user.email = email
    user.role = "admin"
    user.active = false

    if(!password || !repeatPassword) {
        res.status(404).send({message: "Las contraseñas son obligatorias"})
    } else {
        console.log("Continuar 1")
        if(password !== repeatPassword) {
            res.status(404).send({message: "Las constraseñas tienen que ser iguales"})
        } else {
            console.log("Continuar 2")
            
            bcrypt.hash(password, null, null, function(err, hash) {
                console.log("Encriptado contraseña")
            })
            // res.status(200).send({message: "Usuario creado"})
        }
    }
}

module.exports = {
    signUp
}