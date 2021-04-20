const Newsletter = require("../models/newsletter");

function subscribeEmail(req, res) {

    console.log("SbuscribeEmail OK")
    console.log(req.params)

    const email = req.params.email
    const newsletter = new Newsletter()

    if(!email) {
        console.log("No hay email")
        res.status(404).send({
            code: 404, message: "El email es obligatorio"
        })
    } else {
        console.log("Continuar 1")
        newsletter.email = email.toLowerCase()
        newsletter.save((err, newsletterStored) => {
            if(err) {
                console.log(err)
                res.status(500).send({
                    code: 500, message: "El email ya existe"
                })
            } else {
                if(!newsletterStored) {
                    console.log("No hay newsletter")
                    res.status(400).send({
                        code: 400, message: "Error al registrarse"
                    })
                } else {
                    console.log("Email registrado")
                    res.status(200).send({
                        code: 200, message: "Email registrado correctamente"
                    })
                }
            }
        })
    }
}

module.exports = {
    subscribeEmail
}