const Shelter = require("../models/Shelter")

const async = require("async")


exports.shelter_create_get = (req, res) => {
    res.send("TODO: shelter create get")
}

exports.shelter_create_post = (req, res) => {
    res.send("TODO: shelter create post")
}

exports.shelter_delete_get = (req, res) => {
    res.send("TODO: shelter delete get")
}

exports.shelter_delete_post = (req, res) => {
    res.send("TODO: shelter delete post")
}

exports.shelter_update_get = (req, res) => {
    res.send("TODO: shelter update get")
}

exports.shelter_update_post = (req, res) => {
    res.send("TODO shelter update post")
}

exports.shelter_detail = (req, res) => {
    res.send("TODO: shelter detail get")
}

exports.shelter_list = (req, res) => {
    res.render("shelter_list", {
        title: "All shelters"
    })
}