const Breed = require("../models/Breed");
const { body, validationResult } = require("express-validator");

const async = require("async");

exports.breed_create_get = (req, res) => {
  res.send("TODO: breed create get");
};

exports.breed_create_post = (req, res) => {
  res.send("TODO: breed create post");
};

exports.breed_delete_get = (req, res) => {
  res.send("TODO: breed delete get");
};

exports.breed_delete_post = (req, res, next) => {
  res.send("TODO: breed delete post");
};

exports.breed_update_get = (req, res, next) => {
  Breed.findById(req.params.id).exec(function (err, breed) {
    res.render("breed_form", {
      title: `Update ${breed.name}`,
      breed,
    });
  });
};

exports.breed_update_post = [
  body("name", "Name must not be empty").trim().escape(),
  body("desc", "Description must not be empty").trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const newBreed = new Breed({
      name: req.body.name,
      desc: req.body.desc,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      Breed.findById(req.params.id).exec(function (err, breed) {
        res.render("breed_detail", {
          title: `${breed.name}`,
          breed,
        });
      });
      return;
    }

    Breed.findByIdAndUpdate(req.params.id, newBreed, function (err, breed) {
      if (err) {
        return next(err);
      }
      res.redirect(breed.url);
    });
  },
];

exports.breed_detail = (req, res, next) => {
  Breed.findById(req.params.id).exec(function (err, breed) {
    res.render("breed_detail", {
      title: `${breed.name}`,
      breed,
    });
  });
};

exports.breed_list = (req, res, next) => {
  Breed.find()
    .sort([["name", "ascending"]])
    .exec(function (err, breed_list) {
      if (err) {
        return next(err);
      }
      res.render("breed_list", {
        title: "All Breeds",
        breed_list,
      });
    });
};
