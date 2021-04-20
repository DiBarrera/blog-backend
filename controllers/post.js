const Post = require("../models/post");

function addPost(req, res) {
    
    console.log("Todo funciona correcto, post creado")

    const body = req.body
    console.log(req.body)
    console.log(body)

    const post = new Post(body)

    post.save((err, postStored) => {
        if(err) {
            console.log(err)
            res.status(500).send({
                code: 500, message: "Error del servidor"
            })
        } else {
            if(!postStored) {
                console.log("No hay post")
                res.status(400).send({
                    code: 400, message: "No se ha podido crear el post"
                })
            } else {
                res.status(200).send({
                    code: 200, message: "Post creado correctamente"
                })
            }
        }
    })
}

function getPosts(req, res) {

    console.log("Get Posts")

    const { page = 1, limit = 10 } = req.query

    console.log("page:", page)
    console.log("limit:", limit)

    const options = {
        page: page,
        limit: parseInt(limit),
        sort: { date: "desc" }
    }

    Post.paginate({}, options, (err, postsStored) => {
        if(err) {
            console.log(err)
            res.status(500).send({
                code: 500, message: "Error del servidor"
            })
        } else {
            if(!postsStored) {
                console.log("No hay Post storeado")
                res.status(400).send({
                    code: 404, message: "No se ha encontrado ningun post"
                })
            } else {
                res.status(200).send({
                    code: 200, posts: postsStored
                })
            }
        }
    })
}

module.exports = {
    addPost,
    getPosts
}