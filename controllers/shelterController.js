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

exports.shelter_detail = (req, res, next) => {
    Shelter.findById(req.params.id)
      .populate({path: "current_cats", populate: {path: "breed"}})
      .exec(function (err, shelter) {
        res.render("shelter_detail", {
            title: shelter.name,
            shelter
        })
      })
}

exports.shelter_list = function (req, res, next){
    Shelter.find()
        .exec(function(err, shelter_list){
            if(err){
                return next(err)
            }
            res.render("shelter_list", {
                title: "All Shelters",
                shelter_list
            })
        })
}