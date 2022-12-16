const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CatSchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    age: {type: String, maxLength: 2},
    color: {type: String, required: true, maxLength: 30},
    desc: {type: String, maxLength: 100},
    breed: {type: Schema.Types.ObjectId, red:"Breed"}
})

CatSchema.virtual("url").get(function(){
    return `/cats/${this._id}`
})