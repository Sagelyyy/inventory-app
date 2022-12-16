const mongoose = require("mongoose");
const catBreeds = require("./BreedList");

const Schema = mongoose.Schema;

const  BreedSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: catBreeds,
        default: "Abyssinian"
    },
    desc: {type: String}
})

BreedSchema.virtual("url").get(function(){
    return`/breeds/${this._id}`
})