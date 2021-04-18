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

function activateMenu(req, res) {

    const { id } = req.params
    console.log(id)
    console.log(req.params)

    const { active } = req.body
    console.log(active)
    console.log(req.body)

    Menu.findByIdAndUpdate(id, { active }, (err, MenuStored) => {
        if(err) {
            console.log(err)
            res.status(500).send({message: "Error del servidor"})
        } else {
            if(!MenuStored) {
                console.log("No se encontro Menú")
                res.status(404).send({message: "No se ha encontrado el menú"})
            } else {
                if(active === true) {
                    console.log(active + " Es igual a true")
                    res.status(200).send({message: "Menú activado correctamente"})
                } else {
                    console.log("Menu desactivado")
                    res.status(200).send({message: "Menú desactivado correctamente"})
                }
            }
        }
    })
}

function deleteMenu(req, res) {

    const { id } = req.params
    console.log(id)
    console.log(req.params)

    Menu.findByIdAndRemove(id, (err, menuDeleted) => {
        if(err) {
            console.log(err)
            res.status(500).send({message: "Error del servidor"})
        } else {
            if(!menuDeleted) {
                console.log("Menú no encontrado")
                res.status(400).send({message: "Menú no encontrado"})
            } else {
                console.log("Menú Eliminado")
                res.status(200).send({message: "El menú ha sido eliminado correctamente"})
            }
        }
    })
}

module.exports = {
    addMenu,
    getMenus,
    updateMenu,
    activateMenu,
    deleteMenu
}