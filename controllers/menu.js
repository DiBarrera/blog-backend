const Menu = require("../models/menu");

function addMenu(req, res) {

    console.log("Add Menu . . .")

    const { title, url, order, active } = req.body
    console.log(req.body)

    const menu = new Menu()
    menu.title = title
    menu.url = url
    menu.order = order
    menu.active = active

    menu.save((err, createdMenu) => {
        if(err) {
            console.log(err)
            res.status(500).send({message: "Error del servidor"})
        } else {
            if(!createdMenu) {
                res.status(404).send({message: "Error al crear el menu"})
            } else {
                console.log("Menu creado")
                res.status(200).send({message: "Menu creado correctamente"})
            }
        }
    })
}

function getMenus(req, res) {

    console.log("Get Menus ...")

    Menu.find()
        .sort({order: "asc"})
        .exec((err, menusStored) => {
            if(err) {
                console.log(err)
                res.status(500).send({message: "Error del servidor"})
            } else {
                if(!menusStored) {
                    res.status(400).send({message: "No se ha encontrdo ningun elemento en el menu"})
                } else {
                    console.log("Buscando Menu")
                    console.log(menusStored)
                    res.status(200).send({ menu: menusStored })
                }
            }
        })
}

function updateMenu(req, res) {

    let menuData = req.body
    console.log(menuData)
    const params = req.params
    console.log(params)

    Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
        if(err) {
            res.status(500).send({message: "Error del servidor"})
        } else {
            if(!menuUpdate) {
                console.log("No se encontro el menú")
                res.status(400).send({message: "No se ha encontrado ningun menú"})
            } else {
                console.log("Menu actualizado")
                res.status(200).send({message: "Menu actualizado correctamente"})
            }
        }
    })
}

module.exports = {
    addMenu,
    getMenus,
    updateMenu
}