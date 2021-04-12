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
    user.email = email.toLowerCase()
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
                if(err) {
                    console.log(`Este es el error 1 ---> ${err}`)
                    res.status(500).send({message: "Error al encriptar la contraseña"})
                } else {
                    console.log("Continuar 3")
                    // res.status(200).send({ message: hash})   // <--- ESTE VA COMENTADO POR QUE INTERFIERE CON LA LINEA 53 DE ALGUNA FORMA. ARROJA EL ERROR: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
                    console.log("Asignando Hash a password de usuario")
                    console.log(`constrasñea de usuario = ${hash}`)
                    console.log(hash)
                    user.password = hash

                    console.log("Registrando usuario con user.save")
                    user.save((err, userStored) => {
                        if(err) {
                            console.log(`Este es el error 2 ---> ${err}`)
                            res.status(500).send({message: "El usuario ya existe"})
                        } else {
                            console.log("Continuar 4")
                            if(!userStored) {
                                res.status(404).send({message: "Error al crear el usuario"})
                            } else {
                                console.log("Continuar 5")
                                console.log(`Este es el usuario Storeado ---> ${userStored}`)
                                res.status(200).send({user: userStored})
                            }
                        }
                    })
                }
            })
            // res.status(200).send({message: "Usuario creado"})
        }
    }
}

module.exports = {
    signUp
}