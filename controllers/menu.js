const Menu = require("../models/menu");

function addMenu(req, res) {

    const { title, url, order, active } = req.body
    const menu = new Menu()
    menu.title = title
    menu.url = url
    menu.order = order
    menu.active = active

    menu.save((err, createdMenu) => {
        if(err) {
            res.status(500).send({message: "Error del servidor"})
        } else {
            if(!createdMenu) {
                res.status(404).send({message: "Error al crear el menu"})
            } else {
                res.status(200).send({message: "Menu creado correctamente"})
            }
        }
    })
}

function getMenus(req, res) {

    Menu.find()
        .sort({order: "asc"})
        .exec((err, menusStored) => {
            if(err) {
                res.status(500).send({message: "Error del servidor"})
            } else {
                if(!menusStored) {
                    res.status(400).send({message: "No se ha encontrdo ningun elemento en el menu"})
                } else {
                    res.status(200).send({ menu: menusStored })
                }
            }
        })
}

function updateMenu(req, res) {

    let menuData = req.body
    const params = req.params

    Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
        if(err) {
            res.status(500).send({message: "Error del servidor"})
        } else {
            if(!menuUpdate) {
                res.status(400).send({message: "No se ha encontrado ningun menú"})
            } else {
                res.status(200).send({message: "Menu actualizado correctamente"})
            }
        }
    })
}

function activateMenu(req, res) {

    const { id } = req.params
    const { active } = req.body

    Menu.findByIdAndUpdate(id, { active }, (err, MenuStored) => {
        if(err) {
            res.status(500).send({message: "Error del servidor"})
        } else {
            if(!MenuStored) {
                res.status(404).send({message: "No se ha encontrado el menú"})
            } else {
                if(active === true) {
                    res.status(200).send({message: "Menú activado correctamente"})
                } else {
                    res.status(200).send({message: "Menú desactivado correctamente"})
                }
            }
        }
    })
}

function deleteMenu(req, res) {

    const { id } = req.params

    Menu.findByIdAndRemove(id, (err, menuDeleted) => {
        if(err) {
            res.status(500).send({message: "Error del servidor"})
        } else {
            if(!menuDeleted) {
                res.status(400).send({message: "Menú no encontrado"})
            } else {
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