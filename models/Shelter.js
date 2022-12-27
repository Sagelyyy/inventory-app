const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShelterSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  desc: { type: String, required: true, maxLength: 300 },
  location: { type: String, required: true, maxLength: 50 },
  current_cats: { type: [mongoose.Schema.ObjectId], ref: "Cat" },
});

ShelterSchema.virtual("url").get(function () {
  return `/shelter/${this._id}`;
});

module.exports = mongoose.model("Shelter", ShelterSchema);
