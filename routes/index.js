var express = require('express');
var router = express.Router();

// Require Controllers
const breed_controller = require("../controllers/breedController")
const cat_controller = require("../controllers/catController")
const shelter_controller = require("../controllers/shelterController")

// Cat Routes

// Get Index
router.get("/", cat_controller.index)

// Get req for creating cat
router.get("/cat/create", cat_controller.cat_create_get)

// Post req for creating cat
router.post("/cat/create", cat_controller.cat_create_post)

// Get req to delete cat
router.get("/cat/:id/delete", cat_controller.cat_delete_get)

// Post req to delete cat
router.post("/cat/:id/delete", cat_controller.cat_delete_post)

// Get req to update cat
router.get("/cat/:id/update", cat_controller.cat_update_get)

// Post req to update cat
router.post("/cat/:id/update", cat_controller.cat_update_post)

// Get req for one cat
router.get("/cat/:id", cat_controller.cat_detail)

// Get req for list of all cats
router.get("/cats", cat_controller.cat_list)

// Breed Routes

// Get req for creating breed
router.get("/breed/create", breed_controller.breed_create_get)

// Post req for creating breed
router.post("/breed/create", breed_controller.breed_create_post)

// Get req to delete breed
router.get("/breed/:id/delete", breed_controller.breed_delete_get)

// Post req to delete breed
router.post("/breed/:id/delete", breed_controller.breed_delete_post)

// Get req to update breed
router.get("/breed/:id/update", breed_controller.breed_update_get)

// Post req to update breed
router.post("/breed/:id/update", breed_controller.breed_update_post)

// Get req for one breed
router.get("/breed/:id", breed_controller.breed_detail)

// Get req for list of all breeds
router.get("/breeds", breed_controller.breed_list)

// Shelter Routes

// Get req for creating shelter
router.get("/shelter/create", shelter_controller.shelter_create_get)

// Post req for creating shelter
router.post("/shelter/create", shelter_controller.shelter_create_post)

// Get req to delete shelter
router.get("/shelter/:id/delete", shelter_controller.shelter_delete_get)

// Post req to delete shelter
router.post("/shelter/:id/delete", shelter_controller.shelter_delete_post)

// Get req to update shelter
router.get("/shelter/:id/update", shelter_controller.shelter_update_get)

// Post req to update shelter
router.post("/shelter/:id/update", shelter_controller.shelter_update_post)

// Get req for one shelter
router.get("/shelter/:id", shelter_controller.shelter_detail)

// Get req for list of all shelters
router.get("/shelters", shelter_controller.shelter_list)



module.exports = router;
