const Breed = require("../models/Breed");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");

dotenv.config();

const async = require("async");

exports.breed_create_get = (req, res, next) => {
  res.render("breed_form", {
    title: `Create new breed`,
  });
};

exports.breed_create_post = [
  body("name", "Name must not be empty").trim().escape(),
  body("desc", "Description must not be empty").trim().escape(),
  (req, res, next) => {
    if (req.body.password !== process.env.ADMIN) {
      return next(Error("Bad admin password"));
    }
    const errors = validationResult(req);

    const newBreed = new Breed({
      name: req.body.name,
      desc: req.body.desc,
    });

    if (!errors.isEmpty()) {
      res.render("breed_form", {
        title: `Create new breed`,
        errors: errors.array,
      });
      return;
    }
    newBreed.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(newBreed.url);
    });
  },
];
exports.breed_delete_get = (req, res, next) => {
  Breed.findById(req.params.id).exec(function (err, breed) {
    if (err) {
      return next(err);
    }
    res.render("breed_delete", {
      title: `Delete ${breed.name}`,
      breed,
    });
  });
};

exports.breed_delete_post = (req, res, next) => {
  if (req.body.password !== process.env.ADMIN) {
    return next(Error("Bad admin password"));
  }
  Breed.findByIdAndRemove(req.body.breedid, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/breeds");
  });
};

exports.breed_update_get = (req, res, next) => {
  Breed.findById(req.params.id).exec(function (err, breed) {
    if (err) {
      return next(err);
    }
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
    if (req.body.password !== process.env.ADMIN) {
      return next(Error("Bad admin password"));
    }
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
          errors,
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
