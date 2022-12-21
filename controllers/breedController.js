const Breed = require("../models/Breed")

const async = require("async")

exports.breed_create_get = (req, res) => {
    res.send("TODO: breed create get")
}

exports.breed_create_post = (req, res) => {
    res.send("TODO: breed create post")
}

exports.breed_delete_get = (req, res) => {
    res.send("TODO: breed delete get")
}

exports.breed_delete_post = (req, res) => {
    res.send("TODO: breed delete post")
}

exports.breed_update_get = (req, res) => {
    res.send("TODO: breed update get")
}

exports.breed_update_post = (req, res) => {
    res.send("TODO breed update post")
}

exports.breed_detail = (req, res) => {
    res.send("TODO: breed detail get")
}

exports.breed_list = (req, res, next) => {
    Breed.find()
        .sort([["name", "ascending"]])
        .exec(function (err, breed_list){
            if(err){
                return next(err)
            }
            res.render("breed_list", {
                title: "All Breeds",
                breed_list
            })
        })
}