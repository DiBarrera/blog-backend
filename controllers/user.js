const bcrypt = require("bcrypt-nodejs");
// const bcrypt = require("bcrypt");   // <--- ESTE SE COMENTA PORQUE SU SYNTAX NO LA HE APRENDIDO A USAR
const User = require("../models/user");
const jwt = require("../services/jwt");

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

function signIn(req, res) {

    console.log("Login correcto...")

    const params = req.body

    console.log(params)

    const email = params.email.toLowerCase()
    const password = params.password

    User.findOne({ email }, (err, userStored) => {
        if(err) {
            console.log(`Este es el error 1 ---> ${err}`)
            res.status(500).send({message: "Error del servidor."})
        } else {
            if(!userStored) {
                console.log(`Este es el error 2 ---> ${!userStored}`)
                res.status(400).send({message: "Usuario no encontrado"})
            } else {
                console.log("Continuar 1")
                console.log("Comparando contraseña con hash")
                console.log(`Las contraseñas son iguales ---> ${password} === ${userStored.password}`)
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if(err) {
                        console.log(`Este es el error 3 ---> ${err}`)
                        res.status(500).send({message: "Error del servidor."})
                    } else if(!check) {
                        console.log(`Este es el error 4 ---> ${password} !=== ${userStored.password}`)
                        res.status(404).send({message: "La contraseña es incorrecta"})
                    } else {
                        console.log("Continuar 2")
                        if(!userStored.active) {
                            console.log(`Este es el error 5 ---> ${!userStored.active}`)
                            res.status(200).send({code: 200, message: "El usuario no se ha activado"})
                        } else {
                            console.log("Continuar 3")
                            console.log("Creadno accessToken y refreshToken")
                            console.log(userStored)
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            })
                        }
                    }
                })
            }
        }
    }) 
}

function getUsers(req, res) {
    console.log("Get Users tres puntos")
    User.find().then(users => {
        if(!users) {
            res.status(404).send({message: "No se ha encontrado ningun usuario"})
        } else {
            res.status(200).send({ users })
        }
    })
}

module.exports = {
    signUp,
    signIn,
    getUsers
}