const Shelter = require("../models/Shelter");
const { body, validationResult } = require("express-validator");
const async = require("async");
const dotenv = require("dotenv");

dotenv.config();

exports.shelter_create_get = (req, res, next) => {
  res.render("shelter_form", {
    title: "Add a new shelter",
  });
};

exports.shelter_create_post = [
  body("name", "Name must not be empty").trim().isLength({ min: 3 }).escape(),
  body("desc", "Description is required").trim().isLength({ min: 10 }).escape(),
  body("location", "Location is required").trim().escape(),
  (req, res, next) => {
    if (req.body.password !== process.env.ADMIN) {
      return next(Error("Bad admin password"));
    }
    const errors = validationResult(req);

    const newShelter = new Shelter({
      name: req.body.name,
      desc: req.body.desc,
      location: req.body.location,
    });

    if (!errors.isEmpty()) {
      res.render("shelter_form", {
        title: "Add a new shelter",
        errors: errors.array(),
      });
      return;
    }
    newShelter.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(newShelter.url);
    });
  },
];

exports.shelter_delete_get = (req, res, next) => {
  Shelter.findById(req.params.id)
    .populate({ path: "current_cats", populate: { path: "breed" } })
    .exec(function (err, shelter) {
      if (err) {
        return next(err);
      }
      res.render("shelter_delete", {
        title: `Delete ${shelter.name}?`,
        shelter,
      });
    });
};

exports.shelter_delete_post = (req, res, next) => {
  if (req.body.password !== process.env.ADMIN) {
    return next(Error("Bad admin password"));
  }
  Shelter.findById(req.params.id)
    .populate({ path: "current_cats", populate: { path: "breed" } })
    .exec(function (err, shelter) {
      if (err) {
        return next(err);
      }
      if (shelter.current_cats.length > 0) {
        res.render("shelter_delete", {
          title: `Delete ${shelter.name}?`,
          shelter,
        });
        return;
      }
      Shelter.findByIdAndRemove(req.body.shelterid, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/shelters");
      });
    });
};

exports.shelter_update_get = (req, res, next) => {
  Shelter.findById(req.params.id).exec(function (err, shelter) {
    if (err) {
      return next(err);
    }
    res.render("shelter_form", {
      title: `Update ${shelter.name}`,
      shelter,
    });
  });
};

exports.shelter_update_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.current_cats)) {
      req.body.current_cats =
        typeof req.body.current_cats === "undefined"
          ? []
          : [req.body.current_cats];
    }
    next();
  },
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("desc", "Bad desc").trim().escape(),
  body("location", "Bad Location").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    if (req.body.password !== process.env.ADMIN) {
      return next(Error("Bad admin password"));
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      Shelter.findById(req.params.id).exec(function (err, shelter) {
        if (err) {
          return next(err);
        }
        res.render("shelter_form", {
          title: `Update ${shelter.name}`,
          shelter,
          errors: errors.array(),
        });
      });
      return;
    }
    Shelter.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          desc: req.body.desc,
          location: req.body.location,
          _id: req.params.id,
        },
      },
      { returnDocument: "after" },
      (err, doc) => {
        if (err) {
          return next(err);
        }
        console.log(doc);
        res.redirect(doc.url);
      }
    );
  },
];

exports.shelter_detail = (req, res, next) => {
  Shelter.findById(req.params.id)
    .populate({ path: "current_cats", populate: { path: "breed" } })
    .exec(function (err, shelter) {
      res.render("shelter_detail", {
        title: shelter.name,
        shelter,
      });
    });
};

exports.shelter_list = function (req, res, next) {
  Shelter.find().exec(function (err, shelter_list) {
    if (err) {
      return next(err);
    }
    res.render("shelter_list", {
      title: "All Shelters",
      shelter_list,
    });
  });
};
