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

exports.cat_detail = (req, res, next) => {
    Cat.findById(req.params.id)
        .populate("breed")
        .exec(function (err, cat) {
            if (err){
                return next(err)
            }
            res.render("cat_detail", {
                title: cat.name,
                cat
            })
        })
}

exports.cat_list = function (req, res, next){
    Cat.find()
        .sort([["name", "ascending"]])
        .populate("breed")
        .exec(function (err, list_cats){
            if (err){
                return next(err)
            }
            res.render("cat_list", {
                title: "All Cats",
                list_cats
            })
        })
}