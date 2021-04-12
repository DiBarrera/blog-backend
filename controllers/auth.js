const jwt = require("../services/jwt");
const moment = require("moment");
const User = require("../models/user");

function willExpireToken(token) {

    const { exp } = jwt.decodedToken(token)
    const currentDate = moment().unix()

    if(currentDate > exp) {
        return true
    }

    return false
}

function refreshAccessToken(req, res) {

    console.log("Estamos refrescando el accessToken")

    const { refreshToken } = req.body
    const isTokenExpired = willExpireToken(refreshToken)

    console.log(refreshToken)
    console.log(isTokenExpired)

    if(isTokenExpired) {
        console.log(isTokenExpired)
        res.status(404).send({message: "El refreshToken ha expirado"})
    } else {
        console.log("Continuar 1")
        const { id } = jwt.decodedToken(refreshToken)

        User.findOne({_id: id}, (err, userStored) => {
            if(err) {
                console.log(err)
                res.status(500).send({message: "Error del servidor"})
            } else {
                console.log("Continuar 2")
                if(!userStored) {
                    console.log(!userStored)
                    res.status(400).send({message: "Usuario no encontrado"})
                } else {
                    console.group("Continuar 3")
                    res.status(200).send({
                        accessToken: jwt.createAccessToken(userStored),
                        refreshToken: refreshToken
                    })
                }
            }
        })
    }
}

module.exports = {
    refreshAccessToken
}