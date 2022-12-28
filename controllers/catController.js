const Cat = require("../models/Cat");
const Shelter = require("../models/Shelter");
const Breed = require("../models/Breed");
const { body, validationResult } = require("express-validator");

const async = require("async");

exports.index = (req, res) => {
  res.render("index", {
    title: "Cat Inventory",
  });
};

exports.cat_create_get = (req, res) => {
  res.send("TODO: cat create get");
};

exports.cat_create_post = (req, res) => {
  res.send("TODO: cat create post");
};

exports.cat_delete_get = (req, res) => {
  res.send("TODO: cat delete get");
};

exports.cat_delete_post = (req, res) => {
  res.send("TODO: cat delete post");
};

exports.cat_update_get = (req, res, next) => {
  async.parallel(
    {
      cat(callback) {
        Cat.findById(req.params.id).populate("breed").exec(callback);
      },
      shelter(callback) {
        Shelter.find({ current_cats: req.params.id }).exec(callback);
      },
      breed(callback) {
        Breed.find()
          .sort([["name", "ascending"]])
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("cat_form", {
        title: results.cat.name,
        cat: results.cat,
        shelter: results.shelter,
        breeds: results.breed,
      });
    }
  );
};

exports.cat_update_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.breed)) {
      req.body.breed =
        typeof req.body.breed === "undefined" ? [] : [req.body.breed];
    }
    next();
  },
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("breed.*", "Breed must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("age", "Age must not be empty").trim().isLength({ min: 1 }).escape(),
  body("color", "Color must be specified").trim().isLength({ min: 1 }).escape(),
  body("gender", "Gender must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("desc").trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const newCat = new Cat({
      name: req.body.name,
      breed: typeof req.body.breed === "undefined" ? [] : req.body.breed,
      age: req.body.age,
      color: req.body.color,
      gender: req.body.gender,
      desc: req.body.desc,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          cat(callback) {
            Cat.findById(req.params.id).populate("breed").exec(callback);
          },
          shelter(callback) {
            Shelter.find({ current_cats: req.params.id }).exec(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }
          res.render("cat_detail", {
            title: results.cat.name,
            cat: results.cat,
            shelter: results.shelter,
            errors: errors.array(),
          });
        }
      );
    }
    Cat.findByIdAndUpdate(req.params.id, newCat, {}, (err, theCat) => {
      if (err) {
        return next(err);
      }
      res.redirect(theCat.url);
    });
  },
];

exports.cat_detail = (req, res, next) => {
  async.parallel(
    {
      cat(callback) {
        Cat.findById(req.params.id).populate("breed").exec(callback);
      },
      shelter(callback) {
        Shelter.find({ current_cats: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("cat_detail", {
        title: results.cat.name,
        cat: results.cat,
        shelter: results.shelter,
      });
    }
  );
};

exports.cat_list = function (req, res, next) {
  Cat.find()
    .sort([["name", "ascending"]])
    .populate("breed")
    .exec(function (err, list_cats) {
      if (err) {
        return next(err);
      }
      res.render("cat_list", {
        title: "All Cats",
        list_cats,
      });
    });
};
