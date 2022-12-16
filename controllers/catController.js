const Cat = require("../models/Cat")

const async = require("async")

exports.index = (req, res) => {
    res.render("index", {
        title: "Cat Inventory"
    })
}

exports.cat_create_get = (req, res) => {
    res.send("TODO: cat create get")
}

exports.cat_create_post = (req, res) => {
    res.send("TODO: cat create post")
}

exports.cat_delete_get = (req, res) => {
    res.send("TODO: cat delete get")
}

exports.cat_delete_post = (req, res) => {
    res.send("TODO: cat delete post")
}

exports.cat_update_get = (req, res) => {
    res.send("TODO: cat update get")
}

exports.cat_update_post = (req, res) => {
    res.send("TODO cat update post")
}

exports.cat_detail = (req, res) => {
    res.send("TODO: cat detail get")
}

exports.cat_list = (req, res) => {
    res.render("cat_list", {
        title: "All Cats"
    })
}